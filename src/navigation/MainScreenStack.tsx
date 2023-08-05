import {Community, Flare, HalfMoon, User} from '../assets/icons';
import {GradientText, Text} from '../components/atoms';
/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';

import BookingTableScreen from '../screens/Booking/BookingTable';
import EventScreen from '../screens/Event';
import FriendsScreen from '../screens/Friends';
import NightlifeScreen from '../screens/Nightlife';
import NotificationScreen from '../screens/Notification';
import MyBookingDetail from '../screens/MyBookingDetail';
import {PlaceDetail} from '../screens/Place/PlaceDetail';
import ProfileScreen from '../screens/Profile';
import {ViewStyle} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
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

export type NightlifeStackParams = {
  NightlifeTabs: undefined;
  PlaceDetail: {
    placeId: string;
  };
  Notification: undefined;
  BookingTable: {
    placeId: string;
  };
  Main: undefined;
  MyBookingDetail: undefined;
};
const Stack = createNativeStackNavigator<NightlifeStackParams>(); // creates object for Stack Navigator

const NightlifeScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="NightlifeTabs"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NightlifeTabs" component={NightlifeScreen} />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        initialParams={{placeId: ''}}
      />
      <Stack.Screen
        name="BookingTable"
        component={BookingTableScreen}
        initialParams={{placeId: ''}}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export {NightlifeScreenNavigator};

const Tab = createBottomTabNavigator<MainStackParams>();

function Main() {
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
            const tabHiddenRoutes = [
              'Notification',
              'BookingTable',
              'PlaceDetail',
            ];
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

const MainScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
      <Stack.Screen name="MyBookingDetail" component={MyBookingDetail} />
      <Stack.Screen name="BookingTable" component={BookingTableScreen} />
    </Stack.Navigator>
  );
};

export default MainScreenStack;
