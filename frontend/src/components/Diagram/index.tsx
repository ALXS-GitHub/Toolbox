import React, {type ReactNode, useRef} from 'react';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {FiMaximize2, FiX} from 'react-icons/fi';
import styles from './styles.module.scss';

/**
 * A diagram made with the `diagrams` skill, in the page's language and in its light and dark versions,
 * following the site theme. Clicking it opens it full screen (diagrams are wider than the text column).
 *
 * Sources: `diagrams/make.py` (one HTML per diagram and language, rendered by the skill).
 * Files: `assets/diagrams/<name>.png` and `<name>-dark.png` (English), `assets/diagrams/fr/…` (French).
 *
 *   <Diagram name="harness-overview" alt="…" caption="…" />
 */
export default function Diagram({name, alt, caption}: {name: string; alt: string; caption?: ReactNode}): ReactNode {
  const {i18n} = useDocusaurusContext();
  const dir = i18n.currentLocale === i18n.defaultLocale ? '' : `${i18n.currentLocale}/`;
  const light = useBaseUrl(`/diagrams/${dir}${name}.png`);
  const dark = useBaseUrl(`/diagrams/${dir}${name}-dark.png`);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlarge = translate({id: 'toolbox.diagram.enlarge', message: 'Enlarge the diagram'});
  const close = translate({id: 'toolbox.diagram.close', message: 'Close'});
  return (
    <figure className={styles.figure}>
      <button type="button" className={styles.open} onClick={() => dialog.current?.showModal()} aria-label={enlarge}>
        <ThemedImage alt={alt} sources={{light, dark}} className={styles.image} />
        <span className={styles.hint} aria-hidden>
          <FiMaximize2 />
        </span>
      </button>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <dialog
        ref={dialog}
        className={styles.dialog}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label={close}>
          <FiX />
        </button>
        <ThemedImage alt={alt} sources={{light, dark}} className={styles.full} />
      </dialog>
    </figure>
  );
}
