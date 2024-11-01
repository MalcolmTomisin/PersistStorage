import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {store, persistor} from './store';
import {List} from './List';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <List />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
