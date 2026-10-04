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
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <img className={styles.heroLogo} src={useBaseUrl('/img/logo.svg')} alt="" aria-hidden />
        <Heading as="h1" className={styles.heroTitle}>
          Toolbox
        </Heading>
        <p className={styles.heroTagline}>
          <Translate id="home.tagline">
            My setup, my tools and my projects — how I use them, and why.
          </Translate>
        </p>
        <div className={styles.heroButtons}>
          <Link className={clsx('button button--primary button--lg', styles.button)} to="/tools">
            <Translate id="home.cta.tools">Browse the tools</Translate>
          </Link>
          <Link className={clsx('button button--secondary button--lg', styles.button)} to="/setup">
            <Translate id="home.cta.setup">See my setup</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Sections(): ReactNode {
  const sections = useSections();
  const counts = useCounts();
  return (
    <section className={clsx('container', styles.sections)}>
      {sections.map((s) => (
        <Link key={s.id} to={s.to} className={styles.section}>
          <span className={styles.sectionIcon}>{s.icon}</span>
          <span className={styles.sectionBody}>
            <span className={styles.sectionTitle}>
              {s.title}
              {counts[s.id] ? <span className={styles.count}>{counts[s.id]}</span> : null}
            </span>
            <span className={styles.sectionText}>{s.description}</span>
          </span>
          <FiArrowRight className={styles.sectionArrow} aria-hidden />
        </Link>
      ))}
    </section>
  );
}

function Legend(): ReactNode {
  const statuses: Status[] = ['active', 'occasional', 'testing', 'archived'];
  return (
    <section className={clsx('container', styles.legend)}>
      <p>
        <Translate id="home.legend">
          Every tool page says whether I still use it. Pages are written from my own use: what the tool is for in
          my setup, how I configured it, and what I replaced it with when I stopped.
        </Translate>
      </p>
      <div className={styles.legendBadges}>
        {statuses.map((s) => (
          <span key={s} className={clsx(styles.legendBadge, styles[`status-${s}`])}>
            <span className={styles.dot} aria-hidden />
            {statusLabel(s)}
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
      <Hero />
      <main>
        <Sections />
        <Legend />
      </main>
    </Layout>
  );
}
