/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {ImageInterface} from '../../../interfaces/Interface';
import useTheme from '../../../theme/useTheme';
import {getInitialNameForFallbackAvatar} from '../../../utils/function';
import Text from '../Text/Text';

interface AvatarProps {
  url: string | null;
  size?: 'small' | 'medium' | 'large';
  alt: string;
}

export const Avatar = ({url, size = 'medium', alt}: AvatarProps) => {
  const theme = useTheme();
  const [isError, setIsError] = useState<boolean>(false);
  const mapSizing: Record<string, ImageInterface> = {
    small: {
      width: 24,
      height: 24,
    },
    medium: {
      width: 32,
      height: 32,
    },
    large: {
      width: 40,
      height: 40,
    },
  };
  return (
    <View>
      {isError || url === null ? (
        <View
          style={{
            height: mapSizing[size as keyof typeof mapSizing].height,
            width: mapSizing[size as keyof typeof mapSizing].width,
            borderRadius: 50,
            backgroundColor: theme?.colors.PRIMARY,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            label={getInitialNameForFallbackAvatar({name: alt})}
            color={theme?.colors.TEXT_PRIMARY}
          />
        </View>
      ) : (
        <Image
          source={{uri: url}}
          style={{
            height: mapSizing[size as keyof typeof mapSizing].height,
            width: mapSizing[size as keyof typeof mapSizing].width,
            borderRadius: 50,
          }}
          resizeMode="cover"
          onError={() => setIsError(true)}
        />
      )}
    </View>
  );
};
