import './ColorTag.scss';
import { TagsMap, TagProps } from '@site/src/constants/tags';

interface ColorTagProps {
  tag: string | null;
  customConfig?: TagProps;
}

const ColorTag: React.FC<ColorTagProps> = ({ tag, customConfig }) => {
  if (!tag) return null;
  const { color, backgroundColor, borderColor } = customConfig || TagsMap[tag] || TagsMap.default;

  return (
    <div
      className={`color-tag center ${tag}`}
      style={{
        color,
        backgroundColor,
        borderColor,
      }}
    >
      {tag}
    </div>
  );
};

export default ColorTag;