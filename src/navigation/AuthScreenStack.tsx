import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Login';
import { SignUp } from '../screens/SignUp';
import { SplashScreen } from '../screens/SplashScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';

export type AuthStackParams = {
  Splash: undefined;
  Login: undefined;
  Welcome: undefined;
  SignUp: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParams>();
function AuthScreenStack() {
  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
}

export default AuthScreenStack;
