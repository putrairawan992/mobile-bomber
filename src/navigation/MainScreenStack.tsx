import React, {ReactNode} from 'react';
import {Spacer, Text} from '../components/atoms';

import {Bookmark} from '../assets/icons/Bookmark';
import EventScreen from '../screens/Event';
import FriendsScreen from '../screens/Friends';
import {Heart} from '../assets/icons/Heart';
import NightlifeScreen from '../screens/Nightlife';
import ProfileScreen from '../screens/Profile';
import {Search} from '../assets/icons/Search';
import {User} from '../assets/icons/User';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useTheme from '../theme/useTheme';

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
        <Spacer sx />
        <Text
          variant="small"
          fontWeight="inter-regular"
          label={item.title}
          color={item.focused ? theme?.colors.PRIMARY : '#0C0C26'}
        />
      </>
    );
  };
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 74,
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
              title="Search"
              icon={
                <Search
                  color={
                    focused
                      ? theme?.colors.PRIMARY
                      : theme?.colors.INACTIVE_TABS
                  }
                  size={28}
                />
              }
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
              title="Saved"
              icon={
                <Heart
                  color={
                    focused
                      ? theme?.colors.PRIMARY
                      : theme?.colors.INACTIVE_TABS
                  }
                  size={28}
                />
              }
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
              title="Booked"
              icon={
                <Bookmark
                  color={
                    focused
                      ? theme?.colors.PRIMARY
                      : theme?.colors.INACTIVE_TABS
                  }
                  size={28}
                />
              }
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
              title="Profile"
              icon={
                <User
                  color={
                    focused
                      ? theme?.colors.PRIMARY
                      : theme?.colors.INACTIVE_TABS
                  }
                  size={28}
                />
              }
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
