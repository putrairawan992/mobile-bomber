// eslint-disable-line @typescript-eslint/no-unused-vars
import {Community, Flare, HalfMoon, User} from '../assets/icons';
import {GradientText, Text} from '../components/atoms';
import React, {ReactNode} from 'react';

import BookingTableScreen from '../screens/Booking/BookingTable';
import EventScreen from '../screens/Event';
import FriendsScreen from '../screens/Friends';
import NotificationScreen from '../screens/Notification';
import MyBookingDetail from '../screens/MyBookingDetail';
import {PlaceDetail} from '../screens/Place/PlaceDetail';
import ProfileScreen from '../screens/Profile';
import {ViewStyle} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useTheme from '../theme/useTheme';
import NightlifeScreen from '../screens/Nightlife';
import {BookingWalkInScreen} from '../screens/Booking/BookingWalkIn';
import {WalkInTicketScreen} from '../screens/Booking/BookingWalkIn/WalkInTicket';
import WineryOrder from '../screens/WineryOrder';

export type MainStackParams = {
  Nightlife: undefined;
  Event: undefined;
  Friends: undefined;
  Profile: undefined;
  PlaceDetail: {
    placeId: string;
  };
  Notification: undefined;
  Main: undefined;
  BookingWalkIn: {
    placeId: string;
  };
  WalkInTicket: {
    placeId: string;
    date: string;
  };
  MyBookingDetail: undefined;
  BookingTable: {
    placeId: string;
  };
  WineryOrder: undefined;
};

interface TabBarContentProps {
  focused: boolean;
  title: string;
  icon: ReactNode;
}

const Stack = createNativeStackNavigator<MainStackParams>(); // creates object for Stack Navigator
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
        component={NightlifeScreen}
        options={() => ({
          tabBarStyle: TabBarStyle,
          tabBarIcon: ({focused}) => (
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
          tabBarIcon: ({focused}) => (
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
          tabBarIcon: ({focused}) => (
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
          tabBarIcon: ({focused}) => (
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
      <Stack.Screen name="WineryOrder" component={WineryOrder} />
      <Stack.Screen
        name="BookingTable"
        component={BookingTableScreen}
        initialParams={{placeId: ''}}
      />
      <Stack.Screen
        name="BookingWalkIn"
        component={BookingWalkInScreen}
        initialParams={{placeId: ''}}
      />
      <Stack.Screen
        name="WalkInTicket"
        component={WalkInTicketScreen}
        initialParams={{placeId: '', date: ''}}
      />
    </Stack.Navigator>
  );
};

export default MainScreenStack;
