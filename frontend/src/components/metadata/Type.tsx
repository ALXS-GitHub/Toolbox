import './Type.scss';
import { TypesMap } from '@site/src/constants/types';

interface TypeProps {
  type: string;
}

const Type: React.FC<TypeProps> = ({ type }) => {
  const { color, backgroundColor, borderColor } = TypesMap[type] || TypesMap.default;

  return (
    <div
      className={`type ${type}`}
      style={{
        color,
        backgroundColor,
        borderColor,
      }}
    >
      {type}
    </div>
  );
};

export default Type;