#!/usr/bin/env node
/**
 * Content checks for Toolbox — run before every build (npm run build), in CI and by the pre-commit hook.
 *
 * 1. Front matter: only known keys, values from the closed lists, logo files that exist.
 * 2. Leaks (the site is public): e-mail addresses, personal paths, secrets, raw identifiers.
 *
 * Usage: node scripts/check-content.mjs [files…]   (no argument: every page of docs/ and i18n/)
 * Exit code 1 when something must be fixed.
 */
import {readFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import {join, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');

const KEYS = new Set([
  'title', 'description', 'url', 'repo', 'status', 'replaced_by', 'kind', 'platforms', 'stack', 'image',
  'sidebar_position', 'sidebar_label', 'slug', 'hide_title', 'hide_table_of_contents', 'toc_max_heading_level',
]);
const STATUS = new Set(['active', 'occasional', 'testing', 'paused', 'playing', 'archived']);
const KIND = new Set([
  'app', 'cli', 'web', 'service', 'library', 'language', 'extension', 'hardware', 'game', 'project', 'config',
]);
const PLATFORMS = new Set(['windows', 'macos', 'linux', 'web', 'android', 'ios']);

// ── Leak patterns ──────────────────────────────────────────────────────────────────────────────────
const ALLOWED_EMAIL = /@(example\.(com|org|net)|users\.noreply\.github\.com|noreply\.github\.com)$|^noreply@|^git@github\.com$/i;
const PLACEHOLDER_USER = /^(<[^>]+>|%USERNAME%|\$env:USERNAME|\$USER|USERNAME|user|username|you|yourname|me|name|public|default)$/i;
const SECRETS = [
  [/sk-ant-[A-Za-z0-9_-]{20,}/, 'Anthropic API key'],
  [/\bsk-(proj-)?[A-Za-z0-9]{32,}/, 'OpenAI API key'],
  [/\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}/, 'GitHub token'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS key'],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}/, 'Slack token'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'Google API key'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'private key'],
  [/\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/, 'JWT'],
  [/https:\/\/(discord|discordapp)\.com\/api\/webhooks\/\d+\/[\w-]+/, 'Discord webhook'],
];
// user:password@host, unless the password is a placeholder (<password>, ***, $VAR…)
const CONNECTION = /\b[a-z+]+:\/\/[^\s:/@]+:([^\s@/]{6,})@/gi;
const PLACEHOLDER_SECRET = /^(<[^>]+>|\*+|\$\{?\w+\}?|password|pass(word)?\d*)$/i;

// My GitHub account: only public repositories may be linked (list: scripts/public-repos.json,
// refresh with `gh repo list ALXS-GitHub --limit 200 --json name,visibility`).
const PUBLIC_REPOS = new Set(
  JSON.parse(readFileSync(join(ROOT, 'scripts', 'public-repos.json'), 'utf8')).map((r) => r.toLowerCase()),
);
const MY_REPO = /github\.com\/ALXS-GitHub\/([A-Za-z0-9._-]+)/gi;
const UUID = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(md|mdx)$/.test(name)) out.push(p);
  }
  return out;
}

function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    else v = v.replace(/^(["'])(.*)\1$/, '$2');
    fm[kv[1]] = v;
  }
  return fm;
}

/** Path of the page inside the docs tree, whatever the locale: tools/dev/cli/fd.md */
function docPath(file) {
  const rel = relative(ROOT, file).split(sep).join('/');
  return rel.replace(/^docs\//, '').replace(/^i18n\/[^/]+\/docusaurus-plugin-content-docs\/current\//, '');
}

function checkFrontMatter(file, text, problems) {
  const page = docPath(file);
  const fm = frontMatter(text);
  if (!fm) return problems.push('no front matter');
  for (const k of Object.keys(fm)) if (!KEYS.has(k)) problems.push(`unknown key "${k}"`);
  const section = page.split('/')[0];
  const isIndex = /(^|\/)index\.mdx?$/.test(page);
  if (fm.status !== undefined) {
    if (!STATUS.has(fm.status)) problems.push(`status "${fm.status}" is not one of ${[...STATUS].join(', ')}`);
    if (section === 'archive' && fm.status !== 'archived') problems.push('pages in archive/ must have status: archived');
    if (section !== 'archive' && fm.status === 'archived' && section !== 'projects')
      problems.push('archived pages belong in archive/');
    if (section === 'games' && fm.status === 'archived') problems.push('games are never archived');
  }
  if (fm.kind !== undefined && !KIND.has(fm.kind)) problems.push(`kind "${fm.kind}" is not one of ${[...KIND].join(', ')}`);
  for (const p of [].concat(fm.platforms ?? [])) if (!PLATFORMS.has(p)) problems.push(`platform "${p}" is unknown`);
  if (fm.image && !fm.image.startsWith('http') && !existsSync(join(ROOT, 'assets', 'images', fm.image)))
    problems.push(`image "${fm.image}" not found in assets/images/`);
  if (!isIndex && ['tools', 'archive'].includes(section)) {
    for (const k of ['description', 'status', 'kind']) if (!fm[k]) problems.push(`tool pages need "${k}"`);
  }
  if (fm.replaced_by && fm.status !== 'archived') problems.push('replaced_by only makes sense on archived pages');
}

function checkLeaks(text, problems) {
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    const at = `line ${i + 1}`;
    for (const m of line.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
      if (!ALLOWED_EMAIL.test(m[0])) problems.push(`${at}: e-mail address (use user@example.com)`);
    }
    for (const m of line.matchAll(/[A-Za-z]:[\\/]{1,2}Users[\\/]{1,2}([^\\/\s`'")]+)/gi)) {
      if (!PLACEHOLDER_USER.test(m[1])) problems.push(`${at}: personal Windows path (use %USERPROFILE% or ~)`);
    }
    for (const m of line.matchAll(/(?:^|[\s`'"(])\/(?:Users|home)\/([^/\s`'")]+)/g)) {
      if (!PLACEHOLDER_USER.test(m[1])) problems.push(`${at}: personal home path (use ~)`);
    }
    for (const [re, what] of SECRETS) if (re.test(line)) problems.push(`${at}: looks like a ${what}`);
    for (const m of line.matchAll(CONNECTION)) {
      if (!PLACEHOLDER_SECRET.test(m[1])) problems.push(`${at}: connection string with a password`);
    }
    for (const m of line.matchAll(MY_REPO)) {
      const repo = m[1].replace(/\.git$/, '').toLowerCase();
      if (!PUBLIC_REPOS.has(repo)) problems.push(`${at}: link to a repository that is not public (${m[1]})`);
    }
    if (UUID.test(line) && !/00000000-0000-0000-0000-000000000000/.test(line))
      problems.push(`${at}: raw identifier (UUID) — use a placeholder`);
  });
}

const files = process.argv.length > 2
  ? process.argv.slice(2).filter((f) => /\.(md|mdx)$/.test(f)).map((f) => resolve(f))
  : [...walk(join(ROOT, 'docs')), ...walk(join(ROOT, 'i18n'))];

let failed = 0;
for (const file of files) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const problems = [];
  const rel = relative(ROOT, file).split(sep).join('/');
  if (rel.startsWith('docs/') || rel.includes('docusaurus-plugin-content-docs/')) checkFrontMatter(file, text, problems);
  checkLeaks(text, problems);
  if (problems.length) {
    failed++;
    console.error(`✗ ${rel}`);
    for (const p of problems) console.error(`    ${p}`);
  }
}
if (failed) {
  console.error(`\n${failed} page(s) to fix.`);
  process.exit(1);
}
console.log(`Content check: OK (${files.length} pages)`);
