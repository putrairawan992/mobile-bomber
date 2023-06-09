/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { type PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, shallowEqual, useSelector } from 'react-redux';
import AppModalToastContext from './src/context/AppModalToastContext';
import Routes from './src/navigation/Routes';
import store from './src/store';
import ThemeProvider from './src/theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppModalToastContext>
            <Routes />
          </AppModalToastContext>
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
