/* eslint-disable import/no-cycle */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/Home';

export type MainStackParams = {
  Home: undefined;
};
const MainStack = createNativeStackNavigator<MainStackParams>();
function MainScreenStack() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
}

export default MainScreenStack;
