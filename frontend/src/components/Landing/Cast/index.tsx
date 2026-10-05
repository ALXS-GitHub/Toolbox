/**
 * The three pieces the environment rests on: CortX, Zorg and the Claude Code harness. Each comes with a
 * mockup of a screen the film does not show, built from the apps' real layout and colours (made-up data).
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiClock,
  FiFlag,
  FiSearch,
  FiCode,
  FiCpu,
  FiExternalLink,
  FiFileText,
  FiFolder,
  FiGitCommit,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMessageSquare,
  FiPlay,
  FiShield,
  FiSmartphone,
  FiSquare,
  FiTerminal,
  FiTool,
  FiX,
  FiZap,
} from 'react-icons/fi';
import {Avatar, ClaudeMark, Chip, Priority, StatusDot} from '../parts';
import {useReveal} from '../useReveal';
import s from './Cast.module.scss';

type Fact = {icon: ReactNode; text: ReactNode};

function Row({
  id,
  logo,
  kicker,
  name,
  lead,
  facts,
  links,
  visual,
  flip,
}: {
  id: string;
  logo: string;
  kicker: string;
  name: string;
  lead: string;
  facts: Fact[];
  links: {to: string; label: string; external?: boolean}[];
  visual: ReactNode;
  flip?: boolean;
}): ReactNode {
  const ref = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={clsx(s.row, flip && s.flip)} id={id}>
      <div className={s.text}>
        <div className={s.kicker}>
          <img src={logo} alt="" width={36} height={36} />
          <span>{kicker}</span>
        </div>
        <h3 className={s.name}>{name}</h3>
        <p className={s.lead}>{lead}</p>
        <ul className={s.facts}>
          {facts.map((f, i) => (
            <li key={i} style={{'--d': `${120 + i * 80}ms`} as React.CSSProperties}>
              <span className={s.factIcon}>{f.icon}</span>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <div className={s.links}>
          {links.map((l) =>
            l.external ? (
              <a key={l.to} className={s.link} href={l.to} target="_blank" rel="noopener noreferrer">
                {l.label} <FiExternalLink />
              </a>
            ) : (
              <Link key={l.to} className={s.link} to={l.to}>
                {l.label} <FiArrowRight />
              </Link>
            ),
          )}
        </div>
      </div>
      <div className={s.visual} aria-hidden>
        {visual}
      </div>
    </div>
  );
}

// ── CortX: the main window — a project, its services, and what the agents are doing ───────────────
function CortxWindow({img}: {img: (p: string) => string}): ReactNode {
  const services = [
    {name: 'web', cmd: 'bun run dev', port: '5173', color: '#2aa6f0', starts: true},
    {name: 'api', cmd: 'bun run api', port: '3000', color: '#8b5cf6', starts: true},
    {name: 'worker', cmd: 'bun run worker', port: null, color: '#f59e0b', starts: false},
  ];
  return (
    <div className={s.cxStack}>
      <div className={s.cxWin}>
        <div className={s.cxTitle}>
          <img src={img('/img/landing/cortx.webp')} alt="" width={18} height={18} />
          <span className={s.cxAppName}>CortX</span>
          <span className={s.cxVersion}>v0.15.10</span>
          <span className={s.cxSearch}>
            <FiSearch />
            <span>Search projects, scripts, tools…</span>
            <kbd>Ctrl K</kbd>
          </span>
          <span className={s.winBtns}>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className={s.cxMain}>
          <aside className={s.cxSide}>
            <span className={s.eyebrow}>Workspace</span>
            <span className={clsx(s.nav, s.navOn)}>
              <FiFolder /> {translate({id: 'home.cast.cortx.nav.projects', message: 'Projects'})}
            </span>
            <span className={s.nav}>
              <FiFileText /> Scripts
            </span>
            <span className={s.nav}>
              <FiCpu /> Agents <em>Beta</em>
            </span>
            <span className={s.eyebrow}>Library</span>
            <span className={s.nav}>
              <FiTool /> {translate({id: 'home.cast.cortx.nav.tools', message: 'Tools'})}
            </span>
            <span className={s.nav}>
              <FiBox /> Apps
            </span>
            <span className={s.nav}>
              <FiTerminal /> Shell Config
            </span>
            <span className={s.eyebrow}>Activity</span>
            <span className={s.runningPill}>
              <span className={s.liveDot} /> <span className={s.runCount} /> running
            </span>
          </aside>
          <div className={s.cxContent}>
            <div className={s.cxHead}>
              <span className={s.cxProj}>
                <i />
                <b>zorg</b>
                <span className={s.cxPath}>~/Projects/zorg</span>
              </span>
              <span className={s.grow} />
              <span className={s.btnOutline}>
                <FiCode /> VSCode
              </span>
              <span className={s.btnPrimary}>
                <FiPlay /> Start all
              </span>
            </div>
            <div className={s.cxTabs}>
              <span className={s.tabOn}>Services</span>
              <span>Environment</span>
              <span>Scripts</span>
              <span>Agents</span>
            </div>
            {services.map((sv, i) => (
              <div key={sv.name} className={clsx(s.svc, sv.starts && s.svcStarts)} style={{'--d': `${700 + i * 650}ms`} as React.CSSProperties}>
                <span className={s.swatch} style={{background: sv.color}}>
                  <FiTerminal />
                </span>
                <span className={s.svcBody}>
                  <span className={s.svcName}>
                    <b>{sv.name}</b>
                    <span className={s.badges}>
                      <span className={s.badgeStopped}>Stopped</span>
                      <span className={s.badgeRunning}>
                        <i /> Running
                      </span>
                    </span>
                    {sv.port ? <span className={s.port}>:{sv.port}</span> : null}
                  </span>
                  <span className={s.svcCmd}>{sv.cmd}</span>
                </span>
                <span className={s.svcBtns}>
                  <span className={s.btnStart}>
                    <FiPlay /> Start
                  </span>
                  <span className={s.btnStop}>
                    <FiSquare /> Stop
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.agentsCard}>
        <div className={s.termHead}>
          <span className={s.termDots}>
            <i />
            <i />
            <i />
          </span>
          pwsh · zorg
        </div>
        <pre className={s.term}>
          <span className={s.tPrompt}>~/zorg</span> <span className={s.tBranch}>main</span> <span className={s.tArrow}>❯</span> cortx agents list
          {'\n'}
          <b>{'STATE     PROVIDER     PROJECT   LAST'}</b>
          {'\n'}
          <span className={s.tWork}>working</span>
          {'   claude-code  zorg      now\n'}
          <span className={s.tWait}>waiting</span>
          {'   codex        toolbox   2m ago\n'}
          <span className={s.tDim}>(scanned in 42 ms)</span>
        </pre>
      </div>
    </div>
  );
}

// ── Zorg: a ticket in detail, as the web app shows it, and the CLI that agents read ──────────────────
function ZorgTicket(): ReactNode {
  const title = translate({id: 'home.cast.zorg.mock.title', message: 'Pin a note to the top of its folder'});
  const done = translate({id: 'home.cast.zorg.mock.done', message: 'Done'});
  const today = translate({id: 'home.cast.zorg.mock.today', message: 'Today'});
  const statusLabel = translate({id: 'home.cast.zorg.prop.status', message: 'Status'});
  return (
    <div className={s.zStack}>
      <div className={s.zModal}>
        <span className={s.zClose}>
          <FiX />
        </span>
        <div className={s.zCrumb}>
          <code>#ZORG-128</code>
        </div>
        <div className={s.zTitle}>{title}</div>
        <div className={s.zGrid}>
          <div className={s.zLeft}>
            <Chip tone="violet">notes</Chip>
            <div className={s.zSection}>{translate({id: 'home.cast.zorg.mock.description', message: 'Description'})}</div>
            <p className={s.zBody}>
              {translate({
                id: 'home.cast.zorg.body',
                message: 'A pinned note stays first in its folder, whatever the sort order.',
              })}
            </p>
            <div className={s.zSection}>
              {translate({id: 'home.cast.zorg.mock.subtickets', message: 'Sub-tickets'})} · 2/2
              <span className={s.zMeter}>
                <i />
              </span>
            </div>
            <ul className={s.zSubs}>
              <li>
                <StatusDot status="done" />
                <code>#ZORG-129</code>
                <s>{translate({id: 'home.cast.zorg.task1', message: 'Pin action in the note menu'})}</s>
              </li>
              <li>
                <StatusDot status="done" />
                <code>#ZORG-130</code>
                <s>{translate({id: 'home.cast.zorg.task2', message: 'Pinned notes listed first'})}</s>
              </li>
            </ul>
            <div className={s.zSection}>
              <FiMessageSquare /> {translate({id: 'home.cast.zorg.activity', message: 'Comments & activity'})}
            </div>
            <div className={s.zActivity} style={{'--d': '300ms'} as React.CSSProperties}>
              <FiClock /> <b>Claude</b> · {statusLabel} → In progress · {today}
            </div>
            <div className={s.zComment} style={{'--d': '650ms'} as React.CSSProperties}>
              <div className={s.zCommentHead}>
                <Avatar claude />
                <b>Claude</b>
                <span>· {today}</span>
              </div>
              {translate({
                id: 'home.cast.zorg.mock.comment',
                message: 'Done: notes have a Pin action and pinned notes stay first. To check: pin one, reload, it stays on top.',
              })}
            </div>
            <div className={s.zActivity} style={{'--d': '1000ms'} as React.CSSProperties}>
              <FiClock /> <b>Claude</b> · {statusLabel} → {done} · {today}
            </div>
          </div>
          <div className={s.zProps}>
            <span className={s.zLabel}>{statusLabel}</span>
            <span className={s.zValue}>
              <StatusDot status="done" /> {done}
            </span>
            <span className={s.zLabel}>{translate({id: 'home.cast.zorg.prop.priority', message: 'Priority'})}</span>
            <span className={s.zValue}>
              <Priority level={2} /> {translate({id: 'home.cast.zorg.prop.medium', message: 'Medium'})}
            </span>
            <span className={s.zLabel}>{translate({id: 'home.cast.zorg.mock.assignee', message: 'Assignee'})}</span>
            <span className={s.zValue}>
              <Avatar claude /> Claude
            </span>
            <span className={s.zLabel}>{translate({id: 'home.cast.zorg.prop.project', message: 'Project'})}</span>
            <span className={s.zValue}>
              <i className={s.projDot} /> Zorg
            </span>
            <span className={s.zLabel}>{translate({id: 'home.cast.zorg.prop.version', message: 'Version'})}</span>
            <span className={s.zValue}>
              <FiFlag className={s.zIcon} /> v0.9
            </span>
          </div>
        </div>
      </div>
      <div className={s.cliCard}>
        <div className={s.termHead}>
          <span className={s.termDots}>
            <i />
            <i />
            <i />
          </span>
          pwsh · zorg
        </div>
        <pre className={s.term}>
          <span className={s.tPrompt}>~/zorg</span> <span className={s.tBranch}>main</span> <span className={s.tArrow}>❯</span> zorg ticket show ZORG-128
          {'\n'}
          <b>#128 {title}</b>
          {'\n'}
          <span className={s.tDim}>{translate({id: 'home.cast.zorg.mock.cliMeta', message: 'status: Done  ·  priority: 2  ·  labels: notes'})}</span>
          {'\n\n'}
          <b>{translate({id: 'home.cast.zorg.mock.cliComments', message: 'Comments (1)'})}</b>
          {'\n'}
          <span className={s.tDim}>{'  — Claude · 2026-10-04 20:05'}</span>
        </pre>
      </div>
      <div className={s.mcpChip}>
        <ClaudeMark size={14} />
        <span>
          <b>claude.ai</b> · {translate({id: 'home.cast.zorg.mcp', message: 'Zorg connector, 8 tools'})}
        </span>
      </div>
    </div>
  );
}

// ── The harness, as a bento ─────────────────────────────────────────────────────────────────────
function Harness(): ReactNode {
  const ref = useReveal<HTMLDivElement>(0.15);
  const {withBaseUrl} = useBaseUrlUtils();
  const skills = [
    {name: 'documents', out: 'HTML · PDF', icon: <FiFileText />},
    {name: 'diagrams', out: 'HTML · PNG', icon: <FiLayers />},
    {name: 'doc-site', out: 'HTML', icon: <FiFolder />},
    {name: 'pages', out: 'HTML', icon: <FiGlobe />},
    {name: 'zorg-tickets', out: 'Zorg CLI', icon: <FiCheck />},
    {name: 'dev-browser', out: 'Chrome', icon: <FiZap />},
  ];
  return (
    <div ref={ref} className={s.harness} id="harness">
      <div className={s.harnessHead}>
        <div className={s.kicker}>
          <img src={withBaseUrl('/img/landing/claude.webp')} alt="" width={36} height={36} />
          <span>{translate({id: 'home.cast.harness.kicker', message: 'The workforce'})}</span>
        </div>
        <h3 className={s.name}>{translate({id: 'home.cast.harness.name', message: 'The Claude Code harness'})}</h3>
        <p className={s.lead}>
          {translate({
            id: 'home.cast.harness.lead',
            message:
              'Everything I built around Claude Code: settings, skills, mods, guardrails and a status line, versioned in one git repository and set up again on a new machine in minutes.',
          })}
        </p>
      </div>
      <div className={s.bento}>
        <div className={clsx(s.tile, s.tileSkills)} style={{'--d': '0ms'} as React.CSSProperties}>
          <h4>{translate({id: 'home.cast.harness.skills.title', message: 'Skills that deliver'})}</h4>
          <p>
            {translate({
              id: 'home.cast.harness.skills.text',
              message:
                'Folders of instructions and scripts, loaded when a request matches. Documents, diagrams and pages share one design and are checked before they are handed over.',
            })}
          </p>
          <ul className={s.skills}>
            {skills.map((sk, i) => (
              <li key={sk.name} style={{'--d': `${300 + i * 110}ms`} as React.CSSProperties}>
                <span className={s.skillIcon}>{sk.icon}</span>
                <code>{sk.name}</code>
                <span className={s.grow} />
                <em>{sk.out}</em>
              </li>
            ))}
          </ul>
        </div>
        <div className={clsx(s.tile, s.tileGuard)} style={{'--d': '120ms'} as React.CSSProperties}>
          <h4>{translate({id: 'home.cast.harness.guard.title', message: 'Guardrails, not vigilance'})}</h4>
          <p>
            {translate({
              id: 'home.cast.harness.guard.text',
              message:
                'An allow-list, a hook before every commit and commits signed with a key I approve: nothing personal leaves the machine, even by mistake.',
            })}
          </p>
          <ol className={s.gates}>
            <li style={{'--d': '400ms'} as React.CSSProperties}>
              <span className={s.gateStep}>git add</span>
              <span className={s.gateName}>{translate({id: 'home.cast.harness.guard.allow', message: 'allow-list'})}</span>
              <code className={s.bad}>
                <FiX /> .credentials.json
              </code>
            </li>
            <li style={{'--d': '600ms'} as React.CSSProperties}>
              <span className={s.gateStep}>git commit</span>
              <span className={s.gateName}>pre-commit hook</span>
              <code className={s.bad}>
                <FiX /> token = sk-…
              </code>
            </li>
            <li style={{'--d': '800ms'} as React.CSSProperties}>
              <span className={s.gateStep}>git push</span>
              <span className={s.gateName}>{translate({id: 'home.cast.harness.guard.ssh', message: 'signed, over SSH'})}</span>
              <code className={s.good}>
                <FiLock /> verified
              </code>
            </li>
          </ol>
        </div>
        <div className={clsx(s.tile, s.tileStatus)} style={{'--d': '200ms'} as React.CSSProperties}>
          <div className={s.statusText}>
            <h4>{translate({id: 'home.cast.harness.status.title', message: 'A status line that says it all'})}</h4>
            <p>
              {translate({
                id: 'home.cast.harness.status.text',
                message:
                  'Two lines under the prompt: folder, branch, model, effort, context used, quotas and cost. Green under half the context, red when it is time to start a clean session.',
              })}
            </p>
          </div>
          <div className={s.statusDemo}>
            <div className={s.sdPrompt}>
              <span>›</span> Try "write a test for…"
            </div>
            <div className={s.sdRow}>
              <span className={s.c1}>📁 ~/Projects/my-project</span>
              <i>│</i>
              <span className={s.c2}>
                🌿 main <b>*2</b>
              </span>
              <i>│</i>
              <span className={s.c3}>🤖 Opus 5.5</span>
              <i>│</i>
              <span className={s.c4}>⚡ high</span>
              <i>│</i>
              <span className={s.c2}>
                🧠 <span className={s.sdBar}>
                  <span />
                </span>{' '}
                46% · 92k/200k
              </span>
              <i>│</i>
              <span className={s.c2}>💰 $1.84</span>
            </div>
            <div className={s.sdRow}>
              <span className={s.c2}>
                ⏳ 5h 34% <em>↻20:20</em> · <b className={s.c4}>7d 61%</b>
              </span>
              <i>│</i>
              <span>⏱ 43m</span>
              <i>│</i>
              <span>
                📝 <b className={s.c5}>+214</b> <b className={s.c6}>−37</b>
              </span>
              <i>│</i>
              <span className={s.c7}>🔥 87%</span>
            </div>
          </div>
        </div>
        <div className={clsx(s.tile, s.tileSmall)} style={{'--d': '260ms'} as React.CSSProperties}>
          <div className={s.duo}>
            <span className={s.duoClaude}>
              <ClaudeMark size={20} />
            </span>
            <span className={s.duoLink} />
            <span className={s.duoCodex}>{'{}'}</span>
          </div>
          <h4>{translate({id: 'home.cast.harness.codex.title', message: 'Images by Codex'})}</h4>
          <p>
            {translate({
              id: 'home.cast.harness.codex.text',
              message:
                "Codex, OpenAI's agent, is mostly how I create images: illustrations, icons and visuals generated straight into the project. Its sessions show up in CortX next to Claude's.",
            })}
          </p>
        </div>
        <div className={clsx(s.tile, s.tileSmall)} style={{'--d': '320ms'} as React.CSSProperties}>
          <div className={s.browser}>
            <span className={s.browserBar}>
              <i />
              <i />
              <i />
              <span>forms.example.com</span>
            </span>
            <span className={s.browserField} />
            <span className={s.browserField} />
            <span className={s.browserBtn}>
              <FiShield /> {translate({id: 'home.cast.harness.browser.me', message: 'I click'})}
            </span>
          </div>
          <h4>{translate({id: 'home.cast.harness.browser.title', message: 'The agent prepares, I approve'})}</h4>
          <p>
            {translate({
              id: 'home.cast.harness.browser.text',
              message:
                'Claude drives Chrome to fill in a form or check a page I am building. It never types a password and never clicks the irreversible button.',
            })}
          </p>
        </div>
      </div>
      <div className={s.harnessLinks}>
        <Link className={s.link} to="/setup/claude-code">
          {translate({id: 'home.cast.harness.link', message: 'Explore the harness'})} <FiArrowRight />
        </Link>
        <Link className={s.link} to="/setup/claude-code/skills">
          {translate({id: 'home.cast.harness.link.skills', message: 'The skills'})} <FiArrowRight />
        </Link>
        <Link className={s.link} to="/setup/claude-code/guardrails">
          {translate({id: 'home.cast.harness.link.guard', message: 'The guardrails'})} <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function Cast(): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();
  const img = (p: string) => withBaseUrl(p);
  return (
    <>
      <Row
        id="cortx"
        logo={img('/img/landing/cortx.webp')}
        kicker={translate({id: 'home.cast.cortx.kicker', message: 'The hub'})}
        name="CortX"
        lead={translate({
          id: 'home.cast.cortx.lead',
          message:
            'The desktop app I built to run everything: my terminal, my projects and their services, my scripts and the inventory of my tools. Open source, for Windows, macOS and Linux.',
        })}
        facts={[
          {icon: <FiTerminal />, text: translate({id: 'home.cast.cortx.f1', message: 'My everyday terminal: tabs, commands as blocks, sessions that come back as I left them.'})},
          {icon: <FiPlay />, text: translate({id: 'home.cast.cortx.f2', message: 'One button starts a project’s front end, API and workers, with their ports and logs.'})},
          {icon: <FiCpu />, text: translate({id: 'home.cast.cortx.f3', message: 'A CLI made for agents: they start services, read logs and find the other Claude Code and Codex sessions.'})},
          {icon: <FiTool />, text: translate({id: 'home.cast.cortx.f4', message: 'It generates my shell: prompt, aliases and integrations, for PowerShell, bash, zsh and fish.'})},
        ]}
        links={[
          {to: '/projects/cortx', label: translate({id: 'home.cast.cortx.link', message: 'How CortX works'})},
          {to: 'https://github.com/ALXS-GitHub/CortX', label: translate({id: 'home.cast.cortx.repo', message: 'Source on GitHub'}), external: true},
        ]}
        visual={<CortxWindow img={img} />}
      />
      <Row
        id="zorg"
        flip
        logo={img('/img/landing/zorg.webp')}
        kicker={translate({id: 'home.cast.zorg.kicker', message: 'The memory'})}
        name="Zorg"
        lead={translate({
          id: 'home.cast.zorg.lead',
          message:
            'My ticket manager, and the meeting point with my agents. Every task lives there with its context, and every pass leaves a trace.',
        })}
        facts={[
          {icon: <FiLayers />, text: translate({id: 'home.cast.zorg.f1', message: 'Projects, tickets, notes, reminders and a calendar: one place for everything I have to do.'})},
          {icon: <FiTerminal />, text: translate({id: 'home.cast.zorg.f2', message: 'A CLI that explains itself to agents: JSON everywhere, and a guide printed by zorg ai.'})},
          {icon: <FiSmartphone />, text: translate({id: 'home.cast.zorg.f3', message: 'An MCP server with OAuth sign-in for claude.ai, in the browser and on the phone.'})},
          {icon: <FiGitCommit />, text: translate({id: 'home.cast.zorg.f4', message: 'Each pass leaves a comment and a commit: no more explaining the context again.'})},
        ]}
        links={[
          {to: '/projects/zorg', label: translate({id: 'home.cast.zorg.link', message: 'What Zorg does'})},
          {to: '/projects/zorg/agents', label: translate({id: 'home.cast.zorg.link.agents', message: 'How agents use it'})},
        ]}
        visual={<ZorgTicket />}
      />
      <Harness />
    </>
  );
}

