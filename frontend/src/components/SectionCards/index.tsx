import React, {type ReactNode} from 'react';
import DocCardList from '@theme/DocCardList';
import {useDocsSidebar, useDoc} from '@docusaurus/plugin-content-docs/client';

/** On a section landing page: the cards of everything else in the section's sidebar. */
export default function SectionCards(): ReactNode {
  const sidebar = useDocsSidebar();
  const {metadata} = useDoc();
  const items = (sidebar?.items ?? []).filter((item) => !(item.type === 'link' && item.docId === metadata.id));
  return <DocCardList items={items} />;
}
