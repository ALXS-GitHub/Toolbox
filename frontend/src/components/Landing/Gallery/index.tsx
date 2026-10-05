/**
 * The other projects, each with a mockup of its main screen. Layouts, colours, type and components come from
 * the apps' own code; every value shown is invented (sample amounts, fictional names, abstract "photos").
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {FiArrowUpRight} from 'react-icons/fi';
import {
  LuBookmark,
  LuBriefcase,
  LuCheck,
  LuCoins,
  LuFileText,
  LuGamepad2,
  LuHouse,
  LuImage,
  LuLayoutDashboard,
  LuMap,
  LuMinus,
  LuPackage,
  LuPalette,
  LuPanelLeftClose,
  LuPlay,
  LuReceipt,
  LuRocket,
  LuSearch,
  LuSquare,
  LuStore,
  LuTrendingUp,
  LuWallet,
  LuX,
} from 'react-icons/lu';
import {
  FaArrowRight,
  FaCog,
  FaCompass,
  FaEnvelope,
  FaGithub,
  FaGoogleDrive,
  FaHome,
  FaKeyboard,
  FaListUl,
  FaPlay,
  FaRobot,
  FaSearch,
  FaSpotify,
  FaTools,
  FaTrophy,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa';
import {statusLabel, type Status} from '@site/src/lib/meta';
import {ClaudeMark} from '../parts';
import {useReveal} from '../useReveal';
import s from './Gallery.module.scss';

// Each mock is a crop of the app's main screen at near-real size: a 37.7 × 23.6 em canvas whose em follows
// the card width. Colours, type, radii and components come from each app's own source.

// ── PayLedger: shadcn on Tailwind, blue primary, light and dark (follows the site) ──────────────
function PayLedger({logo}: {logo: string}): ReactNode {
  const bars = [
    [46, 18],
    [52, 22],
    [48, 30],
    [58, 16],
    [55, 26],
    [61, 24],
  ];
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin'];
  return (
    <div className={clsx(s.mock, s.pl)}>
      <aside className={s.plSide}>
        <div className={s.plBrand}>
          <img src={logo} alt="" />
          <span>
            <b>PayLedger</b>
            <em>v1.4.0</em>
          </span>
          <LuPanelLeftClose />
        </div>
        <span className={s.plSearch}>
          <LuSearch /> Rechercher… <kbd>Ctrl K</kbd>
        </span>
        <span className={clsx(s.plNav, s.plNavOn)}>
          <LuLayoutDashboard /> Tableau de bord
        </span>
        <span className={s.plGroup}>Mes revenus</span>
        <span className={s.plNav}>
          <LuBriefcase /> Activités
        </span>
        <span className={s.plNav}>
          <LuFileText /> Fiches de paie
        </span>
        <span className={s.plNav}>
          <LuCoins /> Autres revenus
        </span>
        <span className={s.plGroup}>Déclaration</span>
        <span className={s.plNav}>
          <LuReceipt /> Déclarations
        </span>
      </aside>
      <div className={s.plMain}>
        <div className={s.plHead}>
          <span>
            <b>Tableau de bord</b>
            <em>Ce qui demande ton attention, puis où tu en es.</em>
          </span>
          <span className={s.plSeg}>
            <i className={s.plSegOn}>Encaissé</i>
            <i>Imposable</i>
          </span>
        </div>
        <div className={s.plStats}>
          <span className={s.plStat}>
            <em>Total encaissé</em>
            <i className={s.plTone} data-tone="success">
              <LuWallet />
            </i>
            <b>12 345 €</b>
            <u>+6 % sur un an</u>
          </span>
          <span className={s.plStat}>
            <em>Salaire net</em>
            <i className={s.plTone} data-tone="info">
              <LuTrendingUp />
            </i>
            <b>6 789 €</b>
            <u>6 fiches de paie</u>
          </span>
        </div>
        <div className={s.plCard}>
          <span className={s.plCardTitle}>Rentrées mensuelles</span>
          <div className={s.plChart}>
            {bars.map(([a, b], i) => (
              <span key={i} className={s.plCol} style={{'--a': `${a}%`, '--b': `${b}%`, '--i': i} as React.CSSProperties}>
                <i />
                <i />
                <em>{months[i]}</em>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={s.agentChip}>
        <ClaudeMark size={11} /> {translate({id: 'home.gallery.payledger.agent', message: 'Payslip entered, document attached'})}{' '}
        <LuCheck />
      </div>
    </div>
  );
}

// ── Souvenirs: dark cinema, editorial (sharp corners), serif italic, mono timecodes, grain ───────
function Souvenirs({logo}: {logo: string}): ReactNode {
  const stacks = [
    {year: '2019', n: '214', hues: [200, 36, 22]},
    {year: '2022', n: '389', hues: [28, 340, 205]},
    {year: '2025', n: '157', hues: [18, 40, 130]},
  ];
  return (
    <div className={clsx(s.mock, s.sv)}>
      <span className={s.svGrain} />
      <header className={s.svNav}>
        <img src={logo} alt="" />
        <b>SOUVENIRS</b>
        <span className={s.svNavOn}>Chronologie</span>
        <span>Albums</span>
        <i>+ Ajouter</i>
      </header>
      <div className={s.svHead}>
        <span className={s.svCode}>— Chronologie · 760 souvenirs</span>
        <span className={s.svTitle}>Une pile par année</span>
      </div>
      <div className={s.svStacks}>
        {stacks.map((st, k) => (
          <div key={st.year} className={s.svStack} style={{'--k': k} as React.CSSProperties}>
            <span className={s.svPile}>
              {st.hues.map((h, i) => (
                <span key={i} className={s.svPrint} style={{'--h': h, '--r': `${(i - 1) * 3.2 + (k - 1) * 0.8}deg`, '--j': i} as React.CSSProperties}>
                  <i />
                </span>
              ))}
            </span>
            <span className={s.svYear}>{st.year}</span>
            <span className={s.svMeta}>
              <em>{st.n} souvenirs</em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Spotify Manager: Spotify-like dark/light, green + pink, glass "now playing" dock ────────────
function SpotifyManager({logo}: {logo: string}): ReactNode {
  const rows = [
    // the user's own favourites (titles, artists, albums only); covers are abstract gradients in each album's tones
    {name: 'LEMONADE', artist: 'aespa · LEMONADE - The 2nd Album', hue: 72},
    {name: 'Whiplash', artist: 'aespa · Whiplash - The 5th Mini Album', hue: 205},
    {name: 'Drama', artist: 'aespa · Drama - The 4th Mini Album', hue: 352},
    {name: "I CAN'T STOP ME", artist: 'TWICE · Eyes Wide Open', hue: 330},
  ];
  const nav: [string, ReactNode][] = [
    ['Home', <FaHome key="h" />],
    ['Library', <FaListUl key="l" />],
    ['Rankings', <FaTrophy key="r" />],
    ['Discover', <FaCompass key="d" />],
    ['Tools', <FaTools key="t" />],
  ];
  return (
    <div className={clsx(s.mock, s.sp)}>
      <aside className={s.spSide}>
        <span className={s.spBrand}>
          <img src={logo} alt="" /> Spotify Manager
        </span>
        {nav.map(([n, icon]) => (
          <span key={n} className={clsx(s.spLink, n === 'Home' && s.spLinkOn)}>
            {icon} {n}
          </span>
        ))}
      </aside>
      <div className={s.spMain}>
        <div className={s.spSection}>
          <b>Top tracks · this month</b>
          <em>
            View all <FaArrowRight />
          </em>
        </div>
        <div className={s.spList}>
          {rows.map((r, i) => (
            <div key={r.name} className={clsx(s.spRow, i === 1 && s.spRowHover)}>
              <span className={s.spRank}>{i + 1}</span>
              <span className={s.spCover} style={{'--hue': r.hue} as React.CSSProperties} />
              <span className={s.spText}>
                <b>{r.name}</b>
                <em>{r.artist}</em>
              </span>
              {i === 1 ? <FaPlay className={s.spPlay} /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className={s.spDock}>
        <i className={s.spProgress} />
        <span className={s.spCover} style={{'--hue': 205} as React.CSSProperties} />
        <span className={s.spText}>
          <b>Whiplash</b>
          <em>aespa</em>
        </span>
        <span className={s.spState}>
          <FaPlay />
        </span>
        <span className={s.spTime}>1:23 · 3:03</span>
        <span className={s.spDevice}>
          <FaSpotify /> Desktop
        </span>
      </div>
    </div>
  );
}

// ── ALXS-RL-Mod: dense dark desktop UI, glass over a violet/blue/orange aurora, hairlines ─────────
function RlMod({logo}: {logo: string}): ReactNode {
  const tiles = [
    // real Rocket League names, as the app shows them
    {icon: <LuPackage />, k: 'Body', v: 'Fennec', on: true},
    {icon: <LuPalette />, k: 'Paint', v: 'Cobalt', on: true},
    {icon: <LuImage />, k: 'Decal', v: 'Flames', on: true},
    {icon: <LuMap />, k: 'Map', v: 'Utopia', on: true},
  ];
  return (
    <div className={clsx(s.mock, s.rl)}>
      <span className={s.rlAurora} />
      <span className={s.rlGrainLayer} />
      <div className={s.rlBar}>
        <img src={logo} alt="" />
        <b>ALXS-RL-Mod</b>
        <span className={s.rlSearch}>
          <LuSearch /> Search or jump to… <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
        <span className={s.rlBadge}>
          <i /> Game closed
        </span>
        <span className={s.rlWin}>
          <LuMinus />
          <LuSquare />
          <LuX />
        </span>
      </div>
      <div className={s.rlBody}>
        <aside className={s.rlRail}>
          <em>Overview</em>
          <span className={s.rlNavOn}>
            <LuHouse /> Home
          </span>
          <span>
            <LuStore /> Marketplace
          </span>
          <em>Game</em>
          <span>
            <LuPlay /> Play
          </span>
          <span>
            <LuBookmark /> Presets
          </span>
          <em>Garage</em>
          <span>
            <LuPackage /> Items
          </span>
          <span>
            <LuPalette /> Palette
          </span>
        </aside>
        <div className={s.rlMain}>
          <span className={s.rlEyebrow}>No injection · no interception · reversible</span>
          <b className={s.rlH1}>Your car. Your colours. Your arena.</b>
          <span className={s.rlBtns}>
            <i className={s.rlPrimary}>
              <LuRocket /> Play online
            </i>
            <i className={s.rlSecondary}>
              <LuGamepad2 /> Play offline (mods)
            </i>
          </span>
          <span className={s.rlLabel}>Current loadout</span>
          <div className={s.rlTiles}>
            {tiles.map((tl) => (
              <span key={tl.k} className={s.rlTile}>
                <em>
                  {tl.icon} {tl.k}
                  {tl.on ? <i className={s.rlDot} /> : null}
                </em>
                <b>{tl.v}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pack a K-Pop Idol: the game's "Candy" kit (Fredoka, cream outlines, chunky shadows, gloss) ───
function KpopIdol(): ReactNode {
  const chips = [
    {n: 'Normal', c: '#bbbbbb', on: true},
    {n: 'Shiny', c: '#ADFF2F'},
    {n: 'Gold', c: '#FFD700'},
  ];
  const cards = [
    // the game's real idols, rarities and in-game income per second (game/src/shared/Shared/IdolData.luau)
    {name: 'Wonyoung', group: 'IVE', rarity: 'Cosmic', c: '155,142,208', hue: 250, rate: '$150K/s'},
    {name: 'Karina', group: 'AESPA', rarity: 'Primordial', c: '107,26,18', hue: 8, rate: '$270K/s', count: 'x3'},
    {name: 'Winter', group: 'AESPA', rarity: 'Origin', c: '64,64,64', hue: 210, rate: '$750K/s'},
  ];
  return (
    <div className={clsx(s.mock, s.kp)}>
      <span className={s.kpStage} />
      <div className={s.kpPanel}>
        <aside className={s.kpSide}>
          <b>📖 Idol Index</b>
          <span className={clsx(s.kpTab, s.kpTabOn)}>Idols</span>
          <span className={s.kpTab}>Groups</span>
        </aside>
        <div className={s.kpContent}>
          <div className={s.kpTop}>
            {chips.map((ch) => (
              <span key={ch.n} className={clsx(s.kpChip, ch.on && s.kpChipOn)} style={{'--c': ch.c} as React.CSSProperties}>
                {ch.n}
              </span>
            ))}
            <b className={s.kpCount}>123/502</b>
          </div>
          <div className={s.kpFilters}>
            <span className={s.kpSearch}>🔍 Search idols…</span>
            <span className={s.kpSelect}>Rarity ▾</span>
            <span className={s.kpSelect}>Group ▾</span>
          </div>
          <div className={s.kpCards}>
            {cards.map((cd) => (
              <span key={cd.name} className={s.kpCard} style={{'--c': cd.c, '--hue': cd.hue} as React.CSSProperties}>
                <span className={s.kpPhoto}>
                  <i />
                </span>
                <span className={s.kpGroup}>{cd.group}</span>
                <span className={s.kpFoot}>
                  <b className={s.kpName}>{cd.name}</b>
                  <em>{cd.rarity}</em>
                  <u>{cd.rate}</u>
                </span>
                {cd.count ? <span className={s.kpBadge}>{cd.count}</span> : null}
              </span>
            ))}
          </div>
        </div>
        <span className={s.kpClose}>✕</span>
      </div>
    </div>
  );
}

// ── Chrome Homepage: wallpaper, grey links panel, dark search panel, custom cursor ───────────────
function ChromeHomepage(): ReactNode {
  const links: [string, ReactNode, string][] = [
    ['GitHub', <FaGithub key="g" />, '#181717'],
    ['YouTube', <FaYoutube key="y" />, '#ff0000'],
    ['Twitch', <FaTwitch key="t" />, '#9146ff'],
    ['Mail', <FaEnvelope key="m" />, '#ea4335'],
    ['Drive', <FaGoogleDrive key="d" />, '#1fa463'],
    ['Typing', <FaKeyboard key="k" />, '#e2b714'],
    ['Chat', <FaRobot key="c" />, '#10a37f'],
    ['Search', <FaSearch key="s" />, '#4285f4'],
  ];
  const history = ['css container queries', 'météo demain', 'recette pâte à crêpes', 'raccourcis vim'];
  return (
    <div className={clsx(s.mock, s.ch)}>
      <span className={s.chWall} />
      <div className={s.chLeft}>
        <div className={s.chTiles}>
          {links.map(([n, icon, c], i) => (
            <span key={n} className={s.chTile} style={{'--c': c, '--i': i} as React.CSSProperties}>
              <i>{icon}</i>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className={s.chRight}>
        <span className={s.chMenu}>
          <i>
            <FaHome />
          </i>
          <i>
            <FaYoutube style={{color: '#ff0000'}} /> YouTube
          </i>
        </span>
        <span className={s.chSearch} />
        {history.map((h) => (
          <span key={h} className={s.chHist}>
            {h} <FaSearch />
          </span>
        ))}
        <span className={s.chGear}>
          <FaCog />
        </span>
        <span className={s.chCursor} />
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
      mock: <PayLedger logo={withBaseUrl('/img/landing/payledger.webp')} />,
    },
    {
      id: 'souvenirs',
      name: 'Souvenirs',
      logo: 'souvenirs',
      status: 'active',
      line: translate({
        id: 'home.gallery.souvenirs.line',
        message: 'A private family app for photos and memories, designed to still be readable in a hundred years.',
      }),
      stack: ['Cloudflare', 'D1 · R2', 'React'],
      to: '/projects/souvenirs',
      mock: <Souvenirs logo={withBaseUrl('/img/landing/souvenirs.webp')} />,
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
      mock: <SpotifyManager logo={withBaseUrl('/img/landing/spotify-manager.webp')} />,
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
      mock: <RlMod logo={withBaseUrl('/img/landing/alxs-rl-mod.webp')} />,
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
