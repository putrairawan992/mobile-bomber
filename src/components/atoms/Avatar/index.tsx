/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Gap, Section} from '..';
import {ImageInterface} from '../../../interfaces/Interface';
import useTheme from '../../../theme/useTheme';
import {getInitialNameForFallbackAvatar} from '../../../utils/function';
import Text from '../Text/Text';

interface AvatarProps {
  url: string | null;
  size?: 'small' | 'medium' | 'large' | 'x-large' | 'ultra-large';
  alt: string;
  name?: string;
  username?: string;
  onPress?: () => void;
}

export const Avatar = ({
  url,
  size = 'medium',
  alt,
  name,
  username,
  onPress,
}: AvatarProps) => {
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
    'x-large': {
      width: 56,
      height: 56,
    },
    'ultra-large': {
      width: 80,
      height: 80,
    },
  };
  return (
    <Section isRow>
      {isError || url === null ? (
        <View
          style={{
            height: mapSizing[size as keyof typeof mapSizing].height,
            width: mapSizing[size as keyof typeof mapSizing].width,
            borderRadius: mapSizing[size as keyof typeof mapSizing].width / 2,
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
        <TouchableOpacity onPress={onPress}>
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
        </TouchableOpacity>
      )}
      {name && username && (
        <>
          <Gap width={8} />
          <Section>
            <Text label={name} />
            <Gap height={4} />
            <Text
              variant="extra-small"
              color="#9F9E9F"
              label={`@${username}`}
            />
          </Section>
        </>
      )}
      {name && username && (
        <>
          <Gap width={8} />
          <Section>
            <Text label={name} />
            <Gap height={4} />
            <Text
              variant="extra-small"
              color="#9F9E9F"
              label={`@${username}`}
            />
          </Section>
        </>
      )}
    </Section>
  );
};
