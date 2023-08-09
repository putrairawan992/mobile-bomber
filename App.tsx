import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider} from 'react-redux';
import AppModalToastContext from './src/context/AppModalToastContext';
import Routes from './src/navigation/Routes';
import store from './src/store';
import ThemeProvider from './src/theme/ThemeProvider';

EStyleSheet.build();

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
