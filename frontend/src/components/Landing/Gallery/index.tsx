/**
 * The other projects, each with a small mockup of its main screen. Layouts and colours come from the apps'
 * code; every value shown is invented (placeholder amounts, fictional names, abstract "photos").
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {FiArrowRight, FiArrowUpRight, FiCheck, FiSearch} from 'react-icons/fi';
import {statusLabel, type Status} from '@site/src/lib/meta';
import {ClaudeMark} from '../parts';
import {useReveal} from '../useReveal';
import s from './Gallery.module.scss';

function PayLedger(): ReactNode {
  const t = (id: string, message: string) => translate({id: `home.gallery.payledger.${id}`, message});
  const stats = [
    {label: t('received', 'Received'), value: '1 234,56', tone: s.blue},
    {label: t('taxable', 'Taxable'), value: '987,65', tone: s.teal},
    {label: t('withheld', 'Withheld'), value: '123,45', tone: s.orange},
    {label: t('documents', 'Documents'), value: '12', tone: s.green},
  ];
  return (
    <div className={clsx(s.mock, s.pl)}>
      <div className={s.plSide}>
        <span className={s.plLogo}>
          <i /> PayLedger
        </span>
        {[70, 55, 62, 48, 58].map((w, i) => (
          <span key={i} className={clsx(s.plNav, i === 0 && s.plNavOn)} style={{width: `${w}%`}} />
        ))}
      </div>
      <div className={s.plMain}>
        <div className={s.plHead}>
          <b>{t('dashboard', 'Dashboard')}</b>
          <span className={s.plSeg}>
            <i className={s.plSegOn} />
            <i />
          </span>
        </div>
        <div className={s.plStats}>
          {stats.map((st) => (
            <span key={st.label} className={s.plStat}>
              <em>{st.label}</em>
              <b>{st.value}</b>
              <i className={st.tone} />
            </span>
          ))}
        </div>
        <div className={s.plBottom}>
          <div className={s.plChart}>
            {[38, 52, 46, 60, 55, 72, 64, 58, 80, 70, 66, 74].map((h, i) => (
              <i key={i} style={{'--h': `${h}%`, '--i': i} as React.CSSProperties} />
            ))}
          </div>
          <div className={s.plTodo}>
            <em>{t('todo', 'To do')}</em>
            <span>
              <i className={s.orange} /> <u />
            </span>
            <span>
              <i className={s.blue} /> <u />
            </span>
          </div>
        </div>
      </div>
      <div className={s.agentChip}>
        <ClaudeMark size={11} /> {t('agent', 'Payslip entered, document attached')} <FiCheck />
      </div>
    </div>
  );
}

function Souvenirs(): ReactNode {
  return (
    <div className={clsx(s.mock, s.sv)}>
      <span className={s.svPhoto} />
      <span className={s.svPhoto} />
      <span className={s.svPhoto} />
      <span className={s.svShade} />
      <span className={s.svGrain} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={s.svDust} style={{'--i': i} as React.CSSProperties} />
      ))}
      <div className={s.svNav}>
        <b>SOUVENIRS</b>
        <span>{translate({id: 'home.gallery.souvenirs.nav', message: 'Timeline · Albums · Map'})}</span>
      </div>
      <div className={s.svCenter}>
        <span className={s.svCode}>— 1998 · 2026</span>
        <span className={s.svTitle}>Souvenirs</span>
        <span className={s.svCta}>{translate({id: 'home.gallery.souvenirs.cta', message: 'See the timeline →'})}</span>
      </div>
    </div>
  );
}

function SpotifyManager(): ReactNode {
  const rows = [
    {name: 'Paper Moons', artist: 'Kite Theory', hue: 150},
    {name: 'Midnight Static', artist: 'Nova Lane', hue: 280},
    {name: 'Golden Hour Drive', artist: 'Mira & the Tides', hue: 30},
    {name: 'Low Tide Letters', artist: 'Harbor Club', hue: 200},
  ];
  return (
    <div className={clsx(s.mock, s.sp)}>
      <div className={s.spSide}>
        <b>Spotify Manager</b>
        {['Home', 'Library', 'Rankings', 'Discover', 'Tools'].map((n) => (
          <span key={n} className={n === 'Rankings' ? s.spNavOn : undefined}>
            {n}
          </span>
        ))}
      </div>
      <div className={s.spMain}>
        <b className={s.spTitle}>Track Ranker</b>
        <span className={s.spSub}>{translate({id: 'home.gallery.spotify.sub', message: 'Drag to rank, then sync'})}</span>
        <div className={s.spList}>
          {rows.map((r, i) => (
            <div key={r.name} className={s.spRow} style={{'--i': i} as React.CSSProperties}>
              <span className={s.spCover} style={{'--hue': r.hue} as React.CSSProperties} />
              <span className={s.spText}>
                <b>{r.name}</b>
                <em>{r.artist}</em>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.spDock}>
        <span className={s.spCover} style={{'--hue': 280} as React.CSSProperties} />
        <span className={s.spLyric}>♪ {translate({id: 'home.gallery.spotify.lyric', message: 'we kept the lights on for the night'})}</span>
        <i className={s.spProgress} />
      </div>
    </div>
  );
}

function RlMod(): ReactNode {
  const slots = ['Car bodies', 'Decals', 'Wheels', 'Boosts', 'Toppers', 'Goal explosions'];
  const items = ['Spinner', 'Halo', 'Drift', 'Zigzag', 'Comet', 'Orbit'];
  return (
    <div className={clsx(s.mock, s.rl)}>
      <span className={s.rlAurora} />
      <div className={s.rlBar}>
        <b>ALXS-RL-Mod</b>
        <span className={s.rlSearch}>Search or jump to… <kbd>Ctrl K</kbd></span>
      </div>
      <div className={s.rlBody}>
        <div className={s.rlRail}>
          <em>Slots</em>
          {slots.map((sl) => (
            <span key={sl} className={sl === 'Wheels' ? s.rlSlotOn : undefined}>
              {sl}
            </span>
          ))}
        </div>
        <div className={s.rlMain}>
          <div className={s.rlComposer}>
            <span>
              <em>You equip</em> Spinner
            </span>
            <FiArrowRight />
            <span>
              <em>You see</em> Comet
            </span>
            <b>Apply swap</b>
          </div>
          <div className={s.rlGrid}>
            {items.map((it, i) => (
              <span key={it} className={clsx(s.rlItem, i === 4 && s.rlItemOn)}>
                <i className={s.wheel} style={{'--r': `${i * 47}deg`} as React.CSSProperties} />
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpopIdol(): ReactNode {
  const cards = [
    {name: 'Haneul', rarity: 'Epic', color: '#B464FF'},
    {name: 'Jiwoo', rarity: 'Legendary', color: '#FFB432'},
    {name: 'Minseo', rarity: 'Mythic', color: '#FF6496'},
  ];
  return (
    <div className={clsx(s.mock, s.kp)}>
      <span className={s.kpDots} />
      <div className={s.kpCards}>
        {cards.map((c, i) => (
          <span key={c.name} className={s.kpCard} style={{'--c': c.color, '--i': i - 1} as React.CSSProperties}>
            <span className={s.kpGroup}>NOVA9</span>
            <span className={s.kpInit}>{c.name.slice(0, 2).toUpperCase()}</span>
            <span className={s.kpShine} />
            <span className={s.kpFoot}>
              <b>★★ {c.name}</b>
              <em>{c.rarity}</em>
            </span>
            {i === 1 ? <span className={s.kpCount}>x3</span> : null}
          </span>
        ))}
      </div>
      <span className={s.kpBtn}>⚡ Equip Best</span>
    </div>
  );
}

function ChromeHomepage(): ReactNode {
  return (
    <div className={clsx(s.mock, s.ch)}>
      <span className={s.chSky} />
      <span className={s.chMount} />
      <div className={s.chLeft}>
        {['#ea4335', '#1db954', '#0a66c2', '#ff0000', '#6e40c9', '#f59e0b', '#14b8a6', '#111827'].map((c, i) => (
          <span key={i} className={s.chTile} style={{'--c': c, '--i': i} as React.CSSProperties}>
            <i />
          </span>
        ))}
      </div>
      <div className={s.chRight}>
        <span className={s.chMenu}>
          <i />
          <i />
          <i />
        </span>
        <span className={s.chSearch}>
          <FiSearch /> Google
        </span>
        {[70, 55, 62].map((w, i) => (
          <span key={i} className={s.chHist} style={{width: `${w}%`}}>
            <FiSearch />
          </span>
        ))}
      </div>
    </div>
  );
}

type Project = {
  id: string;
  name: string;
  logo: string;
  status: Status;
  line: string;
  stack: string[];
  to: string;
  external?: {href: string; label: string};
  mock: ReactNode;
};

export default function Gallery(): ReactNode {
  const ref = useReveal<HTMLDivElement>(0.1);
  const {withBaseUrl} = useBaseUrlUtils();
  const projects: Project[] = [
    {
      id: 'payledger',
      name: 'PayLedger',
      logo: 'payledger',
      status: 'active',
      line: translate({
        id: 'home.gallery.payledger.line',
        message: 'Income, payslips, taxes and paperwork in a fully local app. An agent reads the documents and fills it in; I check.',
      }),
      stack: ['Tauri 2', 'Rust', 'SQLite'],
      to: '/projects/payledger',
      mock: <PayLedger />,
    },
    {
      id: 'souvenirs',
      name: 'Souvenirs',
      logo: 'souvenirs',
      status: 'paused',
      line: translate({
        id: 'home.gallery.souvenirs.line',
        message: 'A private family app for photos and memories, designed to still be readable in a hundred years.',
      }),
      stack: ['Cloudflare', 'D1 · R2', 'React'],
      to: '/projects/souvenirs',
      mock: <Souvenirs />,
    },
    {
      id: 'spotify',
      name: 'Spotify Manager',
      logo: 'spotify-manager',
      status: 'active',
      line: translate({
        id: 'home.gallery.spotify.line',
        message: 'Rankings of my favourite tracks and artists over time, safe sub-playlists and synced karaoke lyrics.',
      }),
      stack: ['React', 'Express', 'MongoDB'],
      to: '/projects/spotify-manager',
      mock: <SpotifyManager />,
    },
    {
      id: 'rlmod',
      name: 'ALXS-RL-Mod',
      logo: 'alxs-rl-mod',
      status: 'active',
      line: translate({
        id: 'home.gallery.rlmod.line',
        message: 'A free app to customise Rocket League on PC by changing game files only, with no injection.',
      }),
      stack: ['Tauri 2', 'Rust', 'React'],
      to: '/projects/alxs-rl-mod',
      external: {href: 'https://alxs-github.github.io/ALXS-RL-Mod/', label: translate({id: 'home.gallery.rlmod.site', message: 'Website'})},
      mock: <RlMod />,
    },
    {
      id: 'kpop',
      name: 'Pack a K-Pop Idol',
      logo: 'pack-a-kpop-idol',
      status: 'active',
      line: translate({
        id: 'home.gallery.kpop.line',
        message: 'A Roblox game about collecting photocards, written almost entirely by talking with Claude Code.',
      }),
      stack: ['Roblox', 'Luau', 'Rojo'],
      to: '/projects/pack-a-kpop-idol',
      external: {href: 'https://www.roblox.com/games/81917869584715', label: translate({id: 'home.gallery.kpop.play', message: 'Play on Roblox'})},
      mock: <KpopIdol />,
    },
    {
      id: 'chrome',
      name: 'Chrome Homepage',
      logo: 'chrome',
      status: 'paused',
      line: translate({
        id: 'home.gallery.chrome.line',
        message: 'A new-tab page with my links, a search box and my latest searches, written to learn browser extensions.',
      }),
      stack: ['React', 'Extension'],
      to: '/projects/chrome-homepage',
      mock: <ChromeHomepage />,
    },
  ];
  return (
    <div ref={ref} className={s.grid}>
      {projects.map((p, i) => (
        <article key={p.id} className={s.card} style={{'--d': `${i * 90}ms`} as React.CSSProperties}>
          <Link to={p.to} className={s.cover} aria-label={p.name}>
            <span className={s.mockArea} aria-hidden>
              {p.mock}
            </span>
          </Link>
          <div className={s.body}>
            <div className={s.head}>
              <img src={withBaseUrl(`/img/landing/${p.logo}.webp`)} alt="" width={32} height={32} loading="lazy" />
              <Link to={p.to} className={s.name}>
                {p.name}
              </Link>
              <span className={clsx(s.status, s[`status-${p.status}`])}>{statusLabel(p.status)}</span>
            </div>
            <p className={s.line}>{p.line}</p>
            <div className={s.foot}>
              {p.stack.map((t) => (
                <span key={t} className={s.tag}>
                  {t}
                </span>
              ))}
              <span className={s.grow} />
              {p.external ? (
                <a className={s.ext} href={p.external.href} target="_blank" rel="noopener noreferrer">
                  {p.external.label} <FiArrowUpRight />
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
