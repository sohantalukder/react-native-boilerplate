import { type StyleProp, type DimensionValue, View } from 'react-native';
import Image from '@/shared/components/atoms/image/Image';
import type { ImageStyle } from '@d11/react-native-fast-image';
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
  height = 20,
  width = 20,
  style,
  borderRadius = 0,
}) => {
  // Check if imageUrl is a valid string and contains http/https
  const isValidUrl =
    imageUrl &&
    typeof imageUrl === 'string' &&
    (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));

  return isValidUrl ? (
    <View style={{ height, width }}>
      <Image
        source={{ uri: imageUrl }}
        height={height}
        width={width}
        wrapperStyle={style}
        borderRadius={borderRadius}
      />
    </View>
  ) : (
    <IconByVariant
      path={'profile'}
      height={Number(height) / 1.5}
      width={Number(width) / 1.5}
    />
  );
};

export default Avatar;
