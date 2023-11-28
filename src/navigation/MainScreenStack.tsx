/* eslint-disable react-native/no-inline-styles */
// eslint-disable-line @typescript-eslint/no-unused-vars
import {Community, Flare, HalfMoon, User} from '../assets/icons';
import {Text} from '../components/atoms';
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
import {
  PlaceCategoryInterface,
  PlaceInterface,
} from '../interfaces/PlaceInterface';
import {GalleryScreen} from '../screens/Gallery';
import PrivacyPage from '../screens/Privacy';
import ComingSoon from '../screens/ComingSoon';
import PlaceByCategory from '../screens/Place/PlaceByCategory';
import {Barcode} from '../assets/icons/Barcode';
import {PlaceDetailSecond} from '../screens/Place/PlaceDetail/PlaceDetailSecond';
import Order from '../screens/Order';
import OrderQrCode from '../screens/Order/OrderQrCode';
import {GalleryMappingInterface} from '../interfaces/Interface';
import GalleryDetail from '../screens/Gallery/GalleryDetail';
import SearchScreen from '../screens/Search';
import Settings from '../screens/Profile/Settings';
import SearchFriends from '../screens/Friends/Search';
import ScanOnTable from '../screens/ScanOnTable';
import {Redirect} from '../screens/Redirect';

export type MainStackParams = {
  ComingSoon: undefined;
  Nightlife?: {isOrder?: boolean};
  ScanOnTable: undefined;
  Event: {
    isRefetch?: boolean;
  };
  Friends: undefined;
  Profile: undefined;
  Order: undefined;
  OrderQrCode: undefined;
  PlaceDetailSecond?: {
    placeData?: PlaceInterface | null;
  };
  PlaceDetail: {
    placeData: PlaceInterface | null;
  };
  Notification: {
    id: string | null;
  };
  Main: undefined;
  BookingWalkIn: {
    placeData: PlaceInterface | null;
  };
  WalkInTicket: {
    placeData: PlaceInterface | null;
    date: string;
  };
  MyBookingDetail: {
    bookingId: string;
    club_id: string;
    status: string;
  };
  BookingTable: {
    placeData: PlaceInterface | null;
  };
  Privacy: undefined;
  WineryOrder: {
    isNotTable?: boolean;
    clubId?: string;
    userId?: string;
    clubName?: undefined;
  };
  SongPlaylist: undefined;
  RequestSong: undefined;
  HistoryRequestSong: undefined;
  UpdateProfile: {
    profileData?: any;
  };
  VerificationID: undefined;
  VerificationID2: undefined;
  VerificationID3: undefined;
  PaymentPage: undefined;
  Offers: {
    placeData: PlaceInterface | null;
  };
  Gallery: {
    placeId: string;
    title: string;
  };
  PlaceByCategory: {
    category: PlaceCategoryInterface;
  };
  GalleryDetail: {
    index: number;
    items: GalleryMappingInterface[];
  };
  Search: undefined;
  Settings: undefined;
  SearchFriends: undefined;
  Redirect: {
    screen: string;
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
          <Text
            fontWeight="semi-bold"
            color={'#EF9533'}
            style={{
              fontSize: 14,
              lineHeight: 25.62,
            }}
            label={item.title}
          />
        ) : (
          <Text
            label={item.title}
            style={{lineHeight: 25.62, fontSize: 14}}
            color="#FBFDFF"
            fontWeight="regular"
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
              title="Home"
              icon={<HalfMoon focused={focused} size={22} />}
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
              title="Party"
              icon={<Flare focused={focused} size={22} />}
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
        name="Order"
        component={Order}
        options={() => ({
          tabBarIcon: ({focused}) => (
            <TabBarContent
              focused={focused}
              title="Order"
              icon={<Barcode focused={focused} size={22} />}
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
              icon={<Community focused={focused} size={22} />}
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
              icon={<User focused={focused} size={22} />}
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
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="OrderQrCode" component={OrderQrCode} />
      <Stack.Screen name="ScanOnTable" component={ScanOnTable} />
      <Stack.Screen name="PlaceDetailSecond" component={PlaceDetailSecond} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
      <Stack.Screen name="MyBookingDetail" component={MyBookingDetail} />
      <Stack.Screen name="WineryOrder" component={WineryOrder} />
      <Stack.Screen name="BookingTable" component={BookingTableScreen} />
      <Stack.Screen name="BookingWalkIn" component={BookingWalkInScreen} />
      <Stack.Screen name="WalkInTicket" component={WalkInTicketScreen} />
      <Stack.Screen name="SongPlaylist" component={SongPlaylist} />
      <Stack.Screen name="RequestSong" component={RequestSong} />
      <Stack.Screen name="HistoryRequestSong" component={HistoryRequestSong} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="VerificationID" component={VerificationID} />
      <Stack.Screen name="VerificationID2" component={VerificationID2} />
      <Stack.Screen name="VerificationID3" component={VerificationID3} />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="Privacy" component={PrivacyPage} />
      <Stack.Screen name="Redirect" component={Redirect} />
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
      <Stack.Screen name="PlaceByCategory" component={PlaceByCategory} />
      <Stack.Screen name="GalleryDetail" component={GalleryDetail} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SearchFriends"
        component={SearchFriends}
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
