import LogInScreen from '../screens/LogIn/LogInScreen';
import OtpForgotPasswordScreen from '../screens/Otp/OtpForgotPasswordScreen';
import OtpSignUpNumberScreen from '../screens/Otp/OtpSignUpNumberScreen';
import React from 'react';
import {SignUp} from '../screens/SignUp';
import {SplashScreen} from '../screens/SplashScreen';
import SuccessNumberScreen from '../screens/Success/SuccessNumberScreen';
import SuccessPasswordScreen from '../screens/Success/SuccessPasswordScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from '../screens/LogIn/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/LogIn/ResetPasswordScreen';

export type AuthStackParams = {
  Splash: undefined;
  LogIn: undefined;
  Welcome: undefined;
  SignUp: undefined;
  OtpForgot: {
    phone: string;
  };
  OtpSignUp: {
    phone: string;
  };
  SuccessNumber: undefined;
  SuccessPassword: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParams>();
function AuthScreenStack() {
  return (
    <AuthStack.Navigator
      initialRouteName="LogIn"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="LogIn" component={LogInScreen} />
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen
        name="OtpForgot"
        component={OtpForgotPasswordScreen}
        initialParams={{phone: ''}}
      />
      <AuthStack.Screen
        name="OtpSignUp"
        component={OtpSignUpNumberScreen}
        initialParams={{phone: ''}}
      />
      <AuthStack.Screen name="SuccessNumber" component={SuccessNumberScreen} />
      <AuthStack.Screen
        name="SuccessPassword"
        component={SuccessPasswordScreen}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthScreenStack;
