/* eslint-disable import/no-cycle */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Login';

export type AuthStackParams = {
  Login: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParams>();
function AuthScreenStack() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthScreenStack;
