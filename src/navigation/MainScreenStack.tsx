/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {GradientText, Text} from '../components/atoms';

import EventScreen from '../screens/Event';
import FriendsScreen from '../screens/Friends';
import NightlifeScreen from '../screens/Nightlife';
import ProfileScreen from '../screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useTheme from '../theme/useTheme';
import {Community, Flare, HalfMoon, User} from '../assets/icons';

export type MainStackParams = {
  Nightlife: undefined;
  Event: undefined;
  Friends: undefined;
  Profile: undefined;
};

interface TabBarProps {
  focused: boolean;
}

interface TabBarContentProps {
  focused: boolean;
  title: string;
  icon: ReactNode;
}

const Tab = createBottomTabNavigator<MainStackParams>();

function MainScreenStack() {
  const TabBarContent = (item: TabBarContentProps) => {
    return (
      <>
        {item.icon}
        {item.focused ? (
          <GradientText
            colors={['#A060FA', '#C800CC']}
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
              lineHeight: 18,
            }}>
            {item.title}
          </GradientText>
        ) : (
          <Text label={item.title} color="#FBFDFF" fontWeight="bold" />
        )}
      </>
    );
  };
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: theme?.colors.BACKGROUND2,
        },
      }}>
      <Tab.Screen
        name="Nightlife"
        component={NightlifeScreen}
        options={() => ({
          tabBarIcon: ({focused}: TabBarProps) => (
            <TabBarContent
              focused={focused}
              title="Nightlife"
              icon={<HalfMoon focused={focused} size={20} />}
            />
          ),
          headerShown: false,
          tabBarLabel() {
            return false;
          },
        })}
      />
      <Tab.Screen
        name="Event"
        component={EventScreen}
        options={() => ({
          tabBarIcon: ({focused}: TabBarProps) => (
            <TabBarContent
              focused={focused}
              title="Event"
              icon={<Flare focused={focused} size={20} />}
            />
          ),
          headerShown: false,
          tabBarLabel() {
            return false;
          },
        })}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={() => ({
          tabBarIcon: ({focused}: TabBarProps) => (
            <TabBarContent
              focused={focused}
              title="Friends"
              icon={<Community focused={focused} size={21} />}
            />
          ),
          headerShown: false,
          tabBarLabel() {
            return false;
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: ({focused}: TabBarProps) => (
            <TabBarContent
              focused={focused}
              title="Event"
              icon={<User focused={focused} size={20} />}
            />
          ),
          headerShown: false,
          tabBarLabel() {
            return false;
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default MainScreenStack;
