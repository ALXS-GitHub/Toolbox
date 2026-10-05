import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import {FiArchive, FiArrowRight, FiCpu, FiFolder, FiPlay, FiSettings, FiTool} from 'react-icons/fi';
import {statusLabel, type Status} from '@site/src/lib/meta';
import Film from '@site/src/components/Landing/Film';
import Cast from '@site/src/components/Landing/Cast';
import Gallery from '@site/src/components/Landing/Gallery';
import ToolBelt from '@site/src/components/Landing/ToolBelt';
import {useReveal} from '@site/src/components/Landing/useReveal';
import styles from './index.module.scss';

type Section = {
  id: string;
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
};

function useSections(): Section[] {
  return [
    {
      id: 'setup',
      to: '/setup',
      icon: <FiSettings />,
      title: translate({id: 'home.setup.title', message: 'Setup'}),
      description: translate({
        id: 'home.setup.description',
        message: 'How my environment fits together: the Claude Code harness, the Windows terminal, Git, editors.',
      }),
    },
    {
      id: 'tools',
      to: '/tools',
      icon: <FiTool />,
      title: translate({id: 'home.tools.title', message: 'Tools'}),
      description: translate({
        id: 'home.tools.description',
        message: 'The apps, CLIs, services and AI tools I use — why I picked them and how I use them.',
      }),
    },
    {
      id: 'projects',
      to: '/projects',
      icon: <FiFolder />,
      title: translate({id: 'home.projects.title', message: 'Projects'}),
      description: translate({
        id: 'home.projects.description',
        message: 'What I build: desktop apps, web apps, games and the tooling around them.',
      }),
    },
    {
      id: 'hardware',
      to: '/hardware',
      icon: <FiCpu />,
      title: translate({id: 'home.hardware.title', message: 'Hardware'}),
      description: translate({
        id: 'home.hardware.description',
        message: 'My computer and accessories, and the software that comes with them.',
      }),
    },
    {
      id: 'games',
      to: '/games',
      icon: <FiPlay />,
      title: translate({id: 'home.games.title', message: 'Games'}),
      description: translate({
        id: 'home.games.description',
        message: 'The games I play, their launchers and the mods I use.',
      }),
    },
    {
      id: 'archive',
      to: '/archive',
      icon: <FiArchive />,
      title: translate({id: 'home.archive.title', message: 'Archive'}),
      description: translate({
        id: 'home.archive.description',
        message: 'Tools I no longer use: why I stopped, and what replaced them.',
      }),
    },
  ];
}

/** Number of pages per sidebar (= per section), section landing pages excluded. */
function useCounts(): Record<string, number> {
  const docs = useAllDocsData().default?.versions[0]?.docs ?? [];
  const counts: Record<string, number> = {};
  for (const doc of docs) {
    if (!doc.sidebar || doc.id.endsWith('/index')) continue;
    counts[doc.sidebar] = (counts[doc.sidebar] ?? 0) + 1;
  }
  return counts;
}

function Hero(): ReactNode {
  const lines = [
    translate({id: 'home.hero.line1', message: 'My own tools, my own processes,'}),
    translate({id: 'home.hero.line2', message: 'and agents doing the heavy lifting.'}),
  ];
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.eyebrow}>
          <img src={useBaseUrl('/img/logo.svg')} alt="" width={22} height={22} />
          <span>Toolbox</span>
          <i />
          <Translate id="home.hero.eyebrow">how I work</Translate>
        </p>
        <Heading as="h1" className={styles.title}>
          {lines.map((line, i) => (
            <span key={line} className={styles.titleLine}>
              <span style={{animationDelay: `${120 + i * 140}ms`}} className={i === 1 ? styles.titleAccent : undefined}>
                {line}
              </span>
            </span>
          ))}
        </Heading>
        <p className={styles.lede}>
          <Translate id="home.hero.lede">
            I build the apps I work with, and I let AI agents, mostly Claude, do most of the work in them. This site
            documents all of it. Here is the short version: how an idea becomes a commit.
          </Translate>
        </p>
      </div>
    </header>
  );
}

function SectionHead({num, kicker, title, lead, id}: {num: string; kicker: string; title: string; lead: string; id: string}): ReactNode {
  const ref = useReveal<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={styles.sectionHead}>
      <p className={styles.kicker}>
        <span>{num}</span>
        {kicker}
      </p>
      <Heading as="h2" id={id} className={styles.sectionTitle}>
        {title}
      </Heading>
      <p className={styles.sectionLead}>{lead}</p>
    </div>
  );
}

function Explore(): ReactNode {
  const sections = useSections();
  const counts = useCounts();
  const ref = useReveal<HTMLDivElement>(0.15);
  const spot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className={styles.sections}>
      {sections.map((sec, i) => (
        <Link
          key={sec.id}
          to={sec.to}
          className={styles.section}
          onMouseMove={spot}
          style={{'--d': `${i * 70}ms`} as React.CSSProperties}>
          <span className={styles.sectionIcon}>{sec.icon}</span>
          <span className={styles.sectionBody}>
            <span className={styles.sectionName}>
              {sec.title}
              {counts[sec.id] ? <span className={styles.count}>{counts[sec.id]}</span> : null}
            </span>
            <span className={styles.sectionText}>{sec.description}</span>
          </span>
          <FiArrowRight className={styles.sectionArrow} aria-hidden />
        </Link>
      ))}
    </div>
  );
}

function Legend(): ReactNode {
  const statuses: Status[] = ['active', 'occasional', 'testing', 'archived'];
  return (
    <section className={styles.legend}>
      <p>
        <Translate id="home.legend">
          Every tool page says whether I still use it. Pages are written from my own use: what the tool is for in
          my setup, how I configured it, and what I replaced it with when I stopped.
        </Translate>
      </p>
      <div className={styles.legendBadges}>
        {statuses.map((st) => (
          <span key={st} className={clsx(styles.legendBadge, styles[`status-${st}`])}>
            <span className={styles.dot} aria-hidden />
            {statusLabel(st)}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({id: 'home.meta.title', message: 'My setup, tools and projects'})}
      description={translate({
        id: 'home.meta.description',
        message: 'A personal, opinionated documentation of my setup, the tools I use and the projects I build.',
      })}>
      <Film />
      <Hero />
      <main className={styles.main}>
        <section className={clsx('container', styles.block)}>
          <SectionHead
            id="pieces"
            num="01"
            kicker={translate({id: 'home.pieces.kicker', message: 'The pieces'})}
            title={translate({id: 'home.pieces.title', message: 'Three pieces hold it together'})}
            lead={translate({
              id: 'home.pieces.lead',
              message: 'Two apps I wrote for myself, and the harness that turns Claude Code into my everyday assistant.',
            })}
          />
          <Cast />
        </section>

        <section className={clsx('container', styles.block)}>
          <SectionHead
            id="projects"
            num="02"
            kicker={translate({id: 'home.gallery.kicker', message: 'The projects'})}
            title={translate({id: 'home.gallery.title', message: 'And the rest of what I build'})}
            lead={translate({
              id: 'home.gallery.lead',
              message:
                'Desktop apps, web apps and games, most of them built with an agent. Several are private: their pages explain how they work, never what they contain.',
            })}
          />
          <Gallery />
          <div className={styles.more}>
            <Link className={styles.moreLink} to="/projects">
              <Translate id="home.gallery.all">All the projects</Translate> <FiArrowRight />
            </Link>
          </div>
        </section>

        <section className={clsx('container', styles.block)}>
          <SectionHead
            id="toolkit"
            num="03"
            kicker={translate({id: 'home.tools.kicker', message: 'The toolkit'})}
            title={translate({id: 'home.tools.heading', message: 'The tools I open every day'})}
            lead={translate({
              id: 'home.tools.lead',
              message: 'A PowerShell 7 terminal that CortX sets up, and the command-line tools I reach for without thinking.',
            })}
          />
          <ToolBelt />
        </section>

        <section className={clsx('container', styles.block, styles.blockLast)}>
          <SectionHead
            id="explore"
            num="04"
            kicker={translate({id: 'home.explore.kicker', message: 'Explore'})}
            title={translate({id: 'home.explore.title', message: 'Where to next?'})}
            lead={translate({
              id: 'home.explore.lead',
              message: 'Every section of the site, with the number of pages in it.',
            })}
          />
          <Explore />
          <Legend />
        </section>
      </main>
    </Layout>
  );
}
