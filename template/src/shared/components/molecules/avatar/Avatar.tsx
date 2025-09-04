import type { StyleProp, DimensionValue, ImageStyle } from 'react-native';
import Image from '@/shared/components/atoms/image/Image';
import { IconByVariant } from '@/shared/components/atoms';

interface AvatarProps {
  imageUrl: string;
  style?: StyleProp<ImageStyle>;
  height?: DimensionValue;
  width?: DimensionValue;
  borderRadius?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  height,
  width,
  style,
  borderRadius = 0,
}) => {
  const externalPhoto = imageUrl?.match(/https/gi);
  return externalPhoto ? (
    <Image
      source={{ uri: externalPhoto ? imageUrl : '' }}
      height={height ?? 20}
      width={width ?? 20}
      style={style}
      borderRadius={borderRadius}
    />
  ) : (
    <IconByVariant
      path={'profile'}
      height={Number(height) / 1.5}
      width={Number(width) / 1.5}
    />
  );
};

export default Avatar;
