import React, {type ReactNode} from 'react';
import Heading from '@theme/Heading';
import type {Props} from '@theme/MDXComponents/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocMeta from '@site/src/components/DocMeta';
import {imagePath, type PageMeta} from '@site/src/lib/meta';
import styles from './styles.module.scss';

/** The page title of a doc: logo, title, then the row of badges from the front matter. */
function DocTitle(props: Props): ReactNode {
  const {frontMatter} = useDoc();
  const meta = frontMatter as PageMeta;
  const logo = useBaseUrl(meta.image ? imagePath(meta.image) : '');
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        {meta.image && <img className={styles.logo} src={logo} alt="" aria-hidden />}
        <Heading {...props} />
      </div>
      {meta.description && <p className={styles.lead}>{meta.description}</p>}
      <DocMeta meta={meta} />
    </header>
  );
}

export default function MDXHeading(props: Props): ReactNode {
  return props.as === 'h1' ? <DocTitle {...props} /> : <Heading {...props} />;
}
