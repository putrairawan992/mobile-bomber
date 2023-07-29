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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceDetail} from '../screens/Place/PlaceDetail';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {ViewStyle} from 'react-native';

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

export type NightlifeStackParams = {
  Nightlife: undefined;
  PlaceDetail: {
    placeId: string;
  };
};
const Stack = createNativeStackNavigator<NightlifeStackParams>(); // creates object for Stack Navigator

const NightlifeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Nightlife" component={NightlifeScreen} />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        initialParams={{placeId: ''}}
      />
    </Stack.Navigator>
  );
};

export {NightlifeScreenNavigator};

const Tab = createBottomTabNavigator<MainStackParams>();

function MainScreenStack() {
  const TabBarContent = (item: TabBarContentProps) => {
    return (
      <>
        {item.icon}
        {item.focused ? (
          <GradientText
            colors={['#FFE419', '#F27611']}
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

  const TabBarStyle: ViewStyle = {
    height: 80,
    backgroundColor: theme?.colors.BACKGROUND2,
    borderTopColor: 'transparent',
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Nightlife"
        component={NightlifeScreenNavigator}
        options={({route}) => ({
          // eslint-disable-next-line @typescript-eslint/no-shadow
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            const tabHiddenRoutes = ['PlaceDetail'];
            if (tabHiddenRoutes.includes(routeName)) {
              return {display: 'none'};
            } else {
              return TabBarStyle;
            }
          })(route),
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
          tabBarStyle: TabBarStyle,
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
          tabBarStyle: TabBarStyle,
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
              icon={<User focused={focused} size={20} />}
            />
          ),
          headerShown: false,
          tabBarLabel() {
            return false;
          },
          tabBarStyle: TabBarStyle,
        })}
      />
    </Tab.Navigator>
  );
}

export default MainScreenStack;
