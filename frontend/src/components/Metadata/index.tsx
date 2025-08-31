import {useState, useRef, useEffect} from 'react'
import styles from './styles.module.scss';
import { FaTags, FaTimes } from 'react-icons/fa'
import { clsx } from 'clsx';
import { useDoc } from '@docusaurus/plugin-content-docs/lib/client/index.js';
import ColorTag from '@site/src/components/ColorTag/ColorTag'
import { type ExtendedDocFrontMatter, DOC_FRONT_MATTER_EXTENSION_KEYS } from '@site/src/types/metadata';
import { TagKeysMap } from '@site/src/constants/tags';


const CustomMetadata = () => {
  const {frontMatter}: {frontMatter: ExtendedDocFrontMatter} = useDoc();
  const [open, setOpen] = useState(false)

  const hasExtension = Object.values(DOC_FRONT_MATTER_EXTENSION_KEYS).some(key => frontMatter[key] !== undefined);
  if (!hasExtension) return null;

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
          <div className={clsx(styles.content, 'center')}>
            {/* {JSON.stringify(frontMatter)} */}
              <div className={clsx(styles.tags, 'center')}>
              <ColorTag tag={frontMatter.category} tagKey="category" />
              <ColorTag tag={frontMatter.origin} tagKey="origin" />
              <ColorTag tag={frontMatter.use_state} tagKey="use_state" />
              <ColorTag tag={frontMatter.os} tagKey="os" />
              <ColorTag tag={frontMatter.version} tagKey="version" />
              <ColorTag tag={`${'⭐'.repeat(Math.max(0, Math.min(5, frontMatter.rating)))}`} customConfig={TagKeysMap.rating} />
            </div>
            <div className={clsx(styles.content__bottom)}>
              {frontMatter.url && (
                <div className={clsx(styles.content__bottom__item)}>
                  URL: <a href={frontMatter.url}>{frontMatter.url}</a>
                </div>
              )}
              {frontMatter.location && (
                <div className={clsx(styles.content__bottom__item)}>
                  Location: <code>{frontMatter.location}</code>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomMetadata