import React, {type ReactNode} from 'react';
import Heading from '@theme/Heading';
import type {Props} from '@theme/MDXComponents/Heading';
import { useDoc } from '@docusaurus/plugin-content-docs/lib/client/index.js';
import { type ExtendedDocFrontMatter } from '@site/src/types/metadata';
import { PropSidebarCustomProps } from '@site/src/types/customProps';
import { imageHook } from '@site/src/hooks/imageHook';
import clsx from 'clsx';

import styles from './styles.module.scss'

export default function MDXHeading(props: Props): ReactNode {
  const {frontMatter}: {frontMatter: ExtendedDocFrontMatter} = useDoc();
  const customProps = frontMatter.sidebar_custom_props as PropSidebarCustomProps | undefined;
  const { imageLoaded, resolvedImage } = imageHook(customProps?.image);
  if (props.as === 'h1' && imageLoaded) {
    return <div className={clsx(styles.imageWrapper)}><Heading {...props} /><img src={resolvedImage} alt={customProps?.image} /></div>;
  }
  return <Heading {...props} />;
}
