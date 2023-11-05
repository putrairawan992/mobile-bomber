/* eslint-disable react-native/no-inline-styles */
import {Star1} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Checklist} from '../../../assets/icons';
import {UserAchievementInterface} from '../../../interfaces/UserInterface';
import {GradientText, Section, Spacer, Text} from '../../atoms';

interface UserAchievementProps {
  data: UserAchievementInterface;
}

export const UserAchievement = ({data}: UserAchievementProps) => {
  return (
    <Section
      padding="16px 16px"
      style={{
        backgroundColor: '#16171A',
        marginHorizontal: 16,
        borderRadius: 8,
      }}>
      <View style={{position: 'relative'}}>
        <Star1
          color="#EF9533"
          size={44}
          style={{opacity: 0.2, position: 'absolute', left: -30}}
        />
      </View>
      <Section isRow isBetween>
        <GradientText
          xAxis={1}
          colors={['#FF9330', '#F90']}
          style={{
            fontSize: 14,
            fontFamily: 'Inter-Bold',
          }}>
          {data.currentLevel}
        </GradientText>
        <Section isRow>
          <Checklist size={12} style={{marginRight: 6}} />
          <Text label={`${data.start}/${data.end} task completed`} />
        </Section>
      </Section>
      <Spacer sm />
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={['#FFE419', '#F27611']}
          start={{x: 1, y: 0}}
          end={{x: 0.5, y: 0}}
          style={[
            styles.progress,
            {
              width: ((data.start / data.end) * 100).toFixed(2) + '%',
            },
          ]}
        />
      </View>
      <Spacer xs />
      <Text
        label={data.planLevel}
        color="#919CAC"
        variant="extra-small"
        style={{textAlign: 'right'}}
      />
    </Section>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    position: 'relative',
  },
  progress: {
    height: 5,
    borderRadius: 15,
  },
});
