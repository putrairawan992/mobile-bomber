import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import {PlaceDetail} from '../screens/Place/PlaceDetail';

enableScreens();

export type StackParams = {
  PlaceDetail: {
    placeId: string;
  };
};
const Stack = createNativeStackNavigator<StackParams>();
const StackScreen = ({}: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        initialParams={{placeId: ''}}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
