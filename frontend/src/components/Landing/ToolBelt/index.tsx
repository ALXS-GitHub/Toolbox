/**
 * The everyday toolkit: a terminal that replays a few real commands (typed, then answered), next to the
 * tools themselves. The demo only runs while visible, and not at all with reduced motion.
 */
import React, {type ReactNode, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {FiArrowRight, FiTerminal} from 'react-icons/fi';
import {useReveal} from '../useReveal';
import s from './ToolBelt.module.scss';

type Step = {dir: string; cmd: string; out: ReactNode};

function useSteps(): Step[] {
  return [
    {
      dir: 'zorg',
      cmd: 'll',
      out: (
        <div className={s.eza}>
          <span className={s.dim}>drwxr-xr-x</span> <span className={s.dim}>-</span> <span className={s.yel}>2m</span> <b className={s.blu}>src</b>
          <br />
          <span className={s.dim}>drwxr-xr-x</span> <span className={s.dim}>-</span> <span className={s.yel}>1h</span> <b className={s.blu}>docs</b>
          <br />
          <span className={s.dim}>.rw-r--r--</span> <span className={s.grn}>2.1k</span> <span className={s.yel}>5m</span> package.json
          <br />
          <span className={s.dim}>.rw-r--r--</span> <span className={s.grn}>812</span> <span className={s.yel}>3d</span> README.md
        </div>
      ),
    },
    {
      dir: 'zorg',
      cmd: 'rg pinned src',
      out: (
        <div>
          <span className={s.mag}>src/notes/NoteList.tsx</span>
          <br />
          <span className={s.grn}>42</span>: .sort((a, b) =&gt; Number(b.<mark>pinned</mark>) - Number(a.<mark>pinned</mark>))
          <br />
          <span className={s.mag}>src/notes/NoteMenu.tsx</span>
          <br />
          <span className={s.grn}>18</span>: {'{'} label: 'Pin', action: toggle<mark>Pinned</mark> {'}'},
        </div>
      ),
    },
    {
      dir: 'zorg',
      cmd: 'z toolbox',
      out: null,
    },
    {
      dir: 'toolbox',
      cmd: 'lg',
      out: (
        <div className={s.lazygit}>
          <div className={s.lgCol}>
            <span className={clsx(s.lgBox, s.lgOn)}>
              <em>Status</em>toolbox → main
            </span>
            <span className={s.lgBox}>
              <em>Files</em>
              <span className={s.yel}>M</span> docs/index.md
              <br />
              <span className={s.grn}>A</span> src/pages/index.tsx
            </span>
          </div>
          <span className={clsx(s.lgBox, s.lgWide)}>
            <em>Commits</em>
            <span className={s.yel}>7c1e9a2</span> feat(site): new home page
            <br />
            <span className={s.yel}>3b8d0f4</span> docs(setup): the harness
            <br />
            <span className={s.yel}>9a51c2e</span> fix(site): locale redirect
          </span>
        </div>
      ),
    },
  ];
}

function TermDemo(): ReactNode {
  const steps = useSteps();
  const {withBaseUrl} = useBaseUrlUtils();
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(steps[0].cmd.length);
  const [showOut, setShowOut] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = box.current!;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {threshold: 0.4});
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    let t: ReturnType<typeof setTimeout>;
    const cmd = steps[i].cmd;
    if (typed < cmd.length) {
      t = setTimeout(() => setTyped(typed + 1), 70 + Math.random() * 60);
    } else if (!showOut) {
      t = setTimeout(() => setShowOut(true), 350);
    } else {
      t = setTimeout(() => {
        const next = (i + 1) % steps.length;
        setI(next);
        setTyped(0);
        setShowOut(false);
      }, steps[i].out ? 2600 : 900);
    }
    return () => clearTimeout(t);
  }, [active, i, typed, showOut, steps]);

  const step = steps[i];
  return (
    <div className={s.term} ref={box} aria-hidden>
      <div className={s.termBar}>
        <img src={withBaseUrl('/img/landing/cortx.webp')} alt="" width={16} height={16} />
        <b>Terminal</b>
        <em>beta</em>
        <span className={s.ver}>v0.15.10</span>
        <span className={s.winBtns}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={s.tabs}>
        <span className={s.tabOn}>
          <FiTerminal /> pwsh · {step.dir}
        </span>
        <span>
          <FiTerminal /> pwsh · ~
        </span>
      </div>
      <div className={s.termBody}>
        <div className={s.block}>
          <div className={s.prompt}>
            <span className={s.omp}>
              <i className={s.ompA}> {step.dir}</i>
              <i className={s.ompB}> main</i>
            </span>
            <span className={s.cmd}>{step.cmd.slice(0, typed)}</span>
            <span className={s.caret} />
          </div>
          <div className={clsx(s.out, showOut && s.outOn)} key={i}>
            {step.out}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolBelt(): ReactNode {
  const ref = useReveal<HTMLDivElement>(0.15);
  const {withBaseUrl} = useBaseUrlUtils();
  const t = (id: string, message: string) => translate({id: `home.tools.role.${id}`, message});
  const tools = [
    {key: 'powershell', name: 'PowerShell 7', role: t('powershell', 'the shell'), to: '/tools/dev/terminal/powershell'},
    {key: 'oh-my-posh', name: 'Oh My Posh', role: t('omp', 'the prompt'), to: '/tools/dev/terminal/oh-my-posh'},
    {key: 'eza', name: 'eza', role: t('eza', 'ls, with icons'), to: '/tools/dev/cli/eza'},
    {key: 'fzf', name: 'fzf', role: t('fzf', 'fuzzy finder'), to: '/tools/dev/cli/fzf'},
    {key: 'ripgrep', name: 'ripgrep', role: t('rg', 'search in code'), to: '/tools/dev/cli/ripgrep'},
    {key: 'zoxide', name: 'zoxide', role: t('zoxide', 'jump to a folder'), to: '/tools/dev/cli/zoxide'},
    {key: 'lazygit', name: 'lazygit', role: t('lazygit', 'git, visually'), to: '/tools/dev/cli/lazygit'},
    {key: 'yazi', name: 'yazi', role: t('yazi', 'file manager'), to: '/tools/dev/cli/yazi'},
    {key: 'neovim', name: 'Neovim', role: t('neovim', 'terminal editor'), to: '/tools/dev/editors/neovim'},
    {key: 'vscode', name: 'VS Code', role: t('vscode', 'the editor'), to: '/tools/dev/editors/vscode'},
    {key: 'zen', name: 'Zen', role: t('zen', 'everyday browser'), to: '/tools/web/browsers/zen'},
    {key: 'scoop', name: 'Scoop', role: t('scoop', 'installs it all'), to: '/tools/dev/terminal/scoop'},
  ];
  return (
    <div ref={ref} className={s.belt}>
      <div className={s.left}>
        <TermDemo />
        <div className={s.links}>
          <Link className={s.link} to="/setup/windows">
            {translate({id: 'home.tools.link.terminal', message: 'The terminal setup'})} <FiArrowRight />
          </Link>
          <Link className={s.link} to="/tools">
            {translate({id: 'home.tools.link.all', message: 'All the tools'})} <FiArrowRight />
          </Link>
        </div>
      </div>
      <ul className={s.tiles}>
        {tools.map((tool, k) => (
          <li key={tool.key} style={{'--d': `${k * 45}ms`} as React.CSSProperties}>
            <Link to={tool.to} className={s.tile}>
              <img src={withBaseUrl(`/img/landing/${tool.key}.webp`)} alt="" width={36} height={36} loading="lazy" />
              <span>
                <b>{tool.name}</b>
                <em>{tool.role}</em>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
