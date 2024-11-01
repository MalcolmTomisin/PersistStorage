import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { hydrateStore, store, storage, RootState } from './store'; // Import your hydrate action


// Custom hook to persist Redux store when the app moves to the background or goes inactive
const usePersistOnBackground = (key: string) => {
  const appState = useRef(AppState.currentState);

  const saveToStorage = (state: RootState) => {
    try {
      const jsonValue = JSON.stringify(state);
      storage.set(key, jsonValue);
    } catch (e) {
      console.error('Failed to save state to AsyncStorage', e);
    }
  };

  // Hydrate the Redux store from AsyncStorage when the app starts/resumes
  const loadFromStorage = () => {
    try {
      const jsonValue = storage.getString(key);
      if (jsonValue != null) {
        const parsedState: RootState = JSON.parse(jsonValue);
        store.dispatch(hydrateStore(parsedState));
      }
    } catch (e) {
      console.error('Failed to load state from AsyncStorage', e);
    }
  };

  // Listen to app state changes and persist state when app goes to background or inactive state
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (appState.current === 'active' && nextAppState.match(/background|inactive/)) {
        const reduxState = store.getState();
        saveToStorage(reduxState);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    loadFromStorage();

    return () => {
      subscription.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePersistOnBackground;
