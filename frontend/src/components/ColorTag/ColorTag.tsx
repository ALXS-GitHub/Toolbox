import './ColorTag.scss';
import { TagProps, TagKeysMap } from '@site/src/constants/tags';

interface ColorTagProps {
  tag: string | null;
  tagKey?: string;
  customConfig?: TagProps;
}

const ColorTag: React.FC<ColorTagProps> = ({ tag, tagKey, customConfig }) => {
  if (!tag) return null;
  const { color, backgroundColor, borderColor } = customConfig || TagKeysMap[tagKey] || TagKeysMap.default;

  return (
    <div
      className={`color-tag center ${tag}`}
      style={{
        color,
        backgroundColor,
        borderColor,
      }}
    >
      {tagKey && <span className="key">{tagKey}: </span>}
      {tag}
    </div>
  );
};

export default ColorTag;