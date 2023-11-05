import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/DJ/Dashboard';
import SongRequested from '../screens/DJ/SongRequested';
import History from '../screens/DJ/History';

export type DjStackParams = {
  Dashboard: undefined;
  SongRequested: undefined;
  History: undefined;
};
const DjStack = createNativeStackNavigator<DjStackParams>();
function DjScreenStack() {
  return (
    <DjStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <DjStack.Screen name="Dashboard" component={Dashboard} />
      <DjStack.Screen name="History" component={History} />
      <DjStack.Screen
        name="SongRequested"
        component={SongRequested}
        options={{
          presentation: 'fullScreenModal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </DjStack.Navigator>
  );
}

export default DjScreenStack;
