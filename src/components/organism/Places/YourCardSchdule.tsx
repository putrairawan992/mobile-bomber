/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';
import {PlaceOperationalTimeInterface} from '../../../interfaces/PlaceInterface';
import {Gap, ScaleAnimation, Section, Text} from '../../atoms';
import {UserLocationInterface} from '../../../interfaces/UserInterface';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {WIDTH} from '../../../utils/config';
import {BarcodeBorder} from '../../../assets/icons/BarcodeBorder';
import {MapBorder} from '../../../assets/icons/MapBorder';
interface PlaceCardProps {
  item: any;
  data: any;
  onSelect: (id: string) => void;
  isPlaceDetail?: boolean;
  onOpenSchedule?: () => void;
  operation?: PlaceOperationalTimeInterface | null;
  onOpenGallery?: () => void;
  isVertical?: boolean;
  userLocation: UserLocationInterface | null;
}

export const YourCardSchdule = ({
  item,
  data,
  isPlaceDetail = false,
}: PlaceCardProps) => {
  return (
    <ScaleAnimation
      onPress={() => undefined}
      disabled={isPlaceDetail ? true : false}
      scaleTo={0.97}
      style={{
        backgroundColor: '#262626',
        borderRadius: 8,
        marginLeft: 20,
        width: data?.length > 0 ? WIDTH * 0.9 : WIDTH / 1.1,
      }}>
      <>
        <LinearGradient
          colors={['#A060FA', '#C800CC']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            paddingVertical: 16,
            borderColor: 'red',
            borderRadius: 8,
            padding: 10,
          }}>
          <View className="flex-row">
            <View
              style={{
                borderColor: '#525252',
                borderWidth: 1,
                borderRadius: 4,
                padding: 10,
              }}>
              <Image
                source={{uri: item?.club_logo}}
                className="w-[74] h-[74]"
                resizeMode="cover"
              />
            </View>
            <Gap width={10} />
            <View className="flex-1">
              <Text
                fontWeight="regular"
                variant="small"
                label={item?.days_remain}
              />
              <Gap height={1} />
              <Section isRow isBetween>
                <Text
                  variant="base"
                  fontWeight="medium"
                  label={
                    item?.club_name?.length > 15
                      ? item?.club_name.slice(0, 15) + '...'
                      : item?.club_name
                  }
                />
                <Section isRow isBetween>
                  <BarcodeBorder size={37} />
                  <Gap width={10} />
                  <MapBorder size={37} />
                </Section>
              </Section>
              <Gap height={10} />
              <Section isRow>
                <Text
                  variant="small"
                  fontWeight="regular"
                  label={moment(item?.booking_date).format(
                    'dddd, DD MMMM YYYY',
                  )}
                />
              </Section>
            </View>
          </View>
        </LinearGradient>
      </>
    </ScaleAnimation>
  );
};
