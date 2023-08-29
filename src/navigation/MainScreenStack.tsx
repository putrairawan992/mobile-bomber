/* eslint-disable react-native/no-inline-styles */
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
import SongPlaylist from '../screens/SongPlaylist';
import RequestSong from '../screens/RequestSong';
import HistoryRequestSong from '../screens/HistoryRequestSong';
import UpdateProfile from '../screens/UpdateProfile';
import VerificationID from '../screens/VerificationID';
import VerificationID2 from '../screens/VerificationID2';
import VerificationID3 from '../screens/VerificationID3';
import PaymentPage from '../screens/PaymentPage';
import Offers from '../screens/Offers';
import {PlaceInterface} from '../interfaces/PlaceInterface';
import {GalleryScreen} from '../screens/Gallery';

export type MainStackParams = {
  Nightlife: undefined;
  Event: undefined;
  Friends: undefined;
  Profile: undefined;
  PlaceDetail: {
    placeData: PlaceInterface | null;
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
    placeData: PlaceInterface | null;
  };
  WineryOrder: undefined;
  SongPlaylist: undefined;
  RequestSong: undefined;
  HistoryRequestSong: undefined;
  UpdateProfile: undefined;
  VerificationID: undefined;
  VerificationID2: undefined;
  VerificationID3: undefined;
  PaymentPage: undefined;
  Offers: undefined;
  Gallery: {
    placeId: string;
    title: string;
  };
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
            colors={['#EF9533', '#EF9533']}
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Regular',
              lineHeight: 18,
            }}>
            {item.title}
          </GradientText>
        ) : (
          <Text
            label={item.title}
            color="#FBFDFF"
            fontWeight="poppins-regular"
          />
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
              title="My Event"
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
      <Stack.Screen name="BookingTable" component={BookingTableScreen} />
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
      <Stack.Screen name="SongPlaylist" component={SongPlaylist} />
      <Stack.Screen name="RequestSong" component={RequestSong} />
      <Stack.Screen name="HistoryRequestSong" component={HistoryRequestSong} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="VerificationID" component={VerificationID} />
      <Stack.Screen name="VerificationID2" component={VerificationID2} />
      <Stack.Screen name="VerificationID3" component={VerificationID3} />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        initialParams={{placeId: '', title: ''}}
        options={{
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainScreenStack;
