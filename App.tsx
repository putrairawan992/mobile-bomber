/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/store';
import ThemeProvider from './src/theme/ThemeProvider';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContext} from './src/context/AppContext';

EStyleSheet.build();

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppContext>
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                <Routes />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </AppContext>
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
