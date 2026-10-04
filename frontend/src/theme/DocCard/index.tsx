import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useDocById, findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import type {Props} from '@theme/DocCard';
import type {PropSidebarItemCategory, PropSidebarItemLink} from '@docusaurus/plugin-content-docs';
import {FiFileText, FiFolder, FiLink} from 'react-icons/fi';
import {imagePath, statusLabel, type Status} from '@site/src/lib/meta';
import styles from './styles.module.scss';

function useCategoryItemsPlural() {
  const {selectMessage} = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: '1 item|{count} items',
          id: 'theme.docs.DocCard.categoryDescription.plurals',
          description: 'The default description for a category card in the generated index',
        },
        {count},
      ),
    );
}

function CardLayout({
  href,
  icon,
  title,
  description,
  status,
  className,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
  status?: Status;
  className?: string;
}): ReactNode {
  return (
    <Link href={href} className={clsx(styles.card, className, status === 'archived' && styles.archived)}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.body}>
        <span className={styles.titleRow}>
          <span className={styles.title}>{title}</span>
          {status && status !== 'active' && (
            <span className={clsx(styles.status, styles[`status-${status}`])}>{statusLabel(status)}</span>
          )}
        </span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
    </Link>
  );
}

function Logo({image}: {image: string}): ReactNode {
  return <img src={useBaseUrl(imagePath(image))} alt="" loading="lazy" />;
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = item.href ?? findFirstSidebarItemLink(item);
  const plural = useCategoryItemsPlural();
  if (!href) return null;
  // A category linked to a page (a multi-page project) carries that page's logo, status and description.
  const props = (item.customProps ?? {}) as {image?: string; status?: Status};
  return (
    <CardLayout
      className={item.className}
      href={href}
      icon={props.image ? <Logo image={props.image} /> : <FiFolder aria-hidden />}
      title={item.label}
      description={item.description ?? plural(item.items.length)}
      status={props.status}
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  const props = (item.customProps ?? {}) as {image?: string; status?: Status};
  const icon = props.image ? (
    <Logo image={props.image} />
  ) : isInternalUrl(item.href) ? (
    <FiFileText aria-hidden />
  ) : (
    <FiLink aria-hidden />
  );
  return (
    <CardLayout
      className={item.className}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
      status={props.status}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
