import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {FiExternalLink, FiGithub} from 'react-icons/fi';
import {kindLabel, platformLabel, statusLabel, type PageMeta} from '@site/src/lib/meta';
import styles from './styles.module.scss';

function host(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** The row of badges under a page title: status, kind, platforms, stack, links. */
export default function DocMeta({meta}: {meta: PageMeta}): ReactNode {
  const {status, kind, platforms, stack, url, repo, replaced_by} = meta;
  if (!status && !kind && !platforms?.length && !stack?.length && !url && !repo) return null;
  return (
    <div className={styles.meta}>
      {status && (
        <span className={clsx(styles.badge, styles.status, styles[`status-${status}`])}>
          <span className={styles.dot} aria-hidden />
          {statusLabel(status)}
        </span>
      )}
      {replaced_by && (
        <span className={clsx(styles.badge, styles.replaced)}>
          <Translate id="toolbox.meta.replacedBy" values={{tool: replaced_by}}>
            {'Replaced by {tool}'}
          </Translate>
        </span>
      )}
      {kind && <span className={styles.badge}>{kindLabel(kind)}</span>}
      {platforms?.map((p) => (
        <span key={p} className={clsx(styles.badge, styles.subtle)}>
          {platformLabel(p)}
        </span>
      ))}
      {stack?.map((s) => (
        <span key={s} className={clsx(styles.badge, styles.subtle)}>
          {s}
        </span>
      ))}
      <span className={styles.spacer} />
      {url && (
        <Link className={styles.link} href={url}>
          <FiExternalLink aria-hidden /> {host(url)}
        </Link>
      )}
      {repo && (
        <Link className={styles.link} href={repo}>
          <FiGithub aria-hidden /> <Translate id="toolbox.meta.source">Source</Translate>
        </Link>
      )}
    </div>
  );
}
