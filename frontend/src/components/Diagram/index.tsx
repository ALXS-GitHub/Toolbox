import React, {type ReactNode} from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';

/**
 * A diagram made with the `diagrams` skill, in its light and dark versions, following the site theme.
 *
 * Files: `assets/diagrams/<name>.png` and `assets/diagrams/<name>-dark.png`
 * (`render.py <schema>.html --figure` then `--figure --dark`).
 *
 *   <Diagram name="harness-overview" alt="…" caption="…" />
 */
export default function Diagram({name, alt, caption}: {name: string; alt: string; caption?: ReactNode}): ReactNode {
  const light = useBaseUrl(`/diagrams/${name}.png`);
  const dark = useBaseUrl(`/diagrams/${name}-dark.png`);
  return (
    <figure className={styles.figure}>
      <ThemedImage alt={alt} sources={{light, dark}} className={styles.image} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
