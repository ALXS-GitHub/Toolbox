import {useState, useRef, useEffect} from 'react'
import styles from './styles.module.scss';
import { FaTags, FaTimes } from 'react-icons/fa'
import { clsx } from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/lib/client/index.js';
import ColorTag from '@site/src/components/ColorTag/ColorTag'
import type { ExtendedDocFrontMatter } from '@site/src/types/metadata';
import { TagsMap } from '@site/src/constants/tags';


const CustomMetadata = () => {
  const {frontMatter}: {frontMatter: ExtendedDocFrontMatter} = useDoc();
  const [open, setOpen] = useState(false)
  return (
    <div className={clsx(styles.customMetadata, { [styles.open]: open, [styles.closed]: !open })}>
      {!open ? (
        <div className={clsx(styles.customMetadataButton, 'center')} onClick={() => setOpen(true)}>
          <FaTags />
        </div>
      ) : (
        <div className={clsx(styles.customMetadataContainer, 'center')}>
          <div className={clsx(styles.customMetadataContainerTop, 'center')}>
            <h2>Metadata</h2>
            <div className={clsx(styles.customMetadataCloseButton, 'center')} onClick={() => setOpen(false)}>
              <FaTimes />
            </div>
          </div>
          {/* {JSON.stringify(frontMatter)} */}
            <div className={clsx(styles.tags, 'center')}>
            <ColorTag tag={frontMatter.category} />
            <ColorTag tag={frontMatter.type} />
            <ColorTag tag={frontMatter.state} />
            <ColorTag tag={`${'⭐'.repeat(Math.max(0, Math.min(5, frontMatter.rating)))}`} customConfig={TagsMap.rating} />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomMetadata