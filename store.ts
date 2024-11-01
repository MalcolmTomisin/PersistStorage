// Redux store setup
import {configureStore} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';

// Initial state with an empty object for features
const initialState = {
  features: {}, // This object will grow larger over time with complex values
};

export const storage = new MMKV();



// Reducer to add new complex features
const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_FEATURE':
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.key]: action.payload.value, // Dynamically adding new complex feature object
        },
      };
    case 'HYDRATE_STORE':
      return {
        ...action.payload, // Hydrate the store with the parsed state
      };
    default:
      return state;
  }
};

export const hydrateStore = (state: any) => ({
  type: 'HYDRATE_STORE',
  payload: state,
});

// Create the store
export const store = configureStore({
  reducer: rootReducer,
});

// Function to generate a complex object for each feature
export const generateComplexFeature = (index: number): Record<string, any> => ({
  id: index,
  name: `Feature ${index}`,
  description: `This is a detailed description of feature number ${index}. It contains nested properties and complex values.`,
  metadata: {
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: ['performance', 'optimization', 'scalability'],
    version: Math.random().toFixed(2),
    developer: {
      name: `Developer ${index}`,
      experience_years: index % 10,
      skills: ['JavaScript', 'React', 'Redux', 'Node.js'],
    },
  },
  settings: {
    enabled: index % 2 === 0, // Alternate between enabled and disabled
    priority: index % 5 === 0 ? 'high' : 'normal',
    retries: Math.floor(Math.random() * 5),
  },
  data: Array.from({length: 1000}, (_, i) => `Data Item ${i}`), // Large array to increase size
  nestedComplexObject: {
    key: `nested-${index}`,
    value: `Nested value ${index}`,
    metadata: {
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: ['nested', 'object', 'metadata'],
      version: Math.random().toFixed(2),
    },
    moreData: Array.from({length: 100}, (_, i) => `Nested Data Item ${i}`),
    sparseKeyValues: Array.from({length: 100}, (_, i) => ({
      key: `key-${i}`,
      value: `value-${i}`,
    })),
    scampering: {
      enabled: index % 2 === 0,
      priority: index % 5 === 0 ? 'high' : 'normal',
      retries: Math.floor(Math.random() * 5),
      safeLand: Array.from({length: 100}, (_, i) => `Safe Land ${i}`),
    },
  }, // Nested complex object
  newFeature: Array.from({length: 100}, (_, i) => ({
    [i]: `New Feature ${i}`,
    [i + 1]: `New Feature ${i + 1}`,
  })),
  branches: Array.from({length: 100}, (_, i) => ({
    branch: `Branch ${i}`,
    commits: Array.from({length: 10}, (_, j) => ({
      id: j,
      message: `Commit message ${j}`,
      timestamp: new Date().toISOString(),
    })),
  })),
});

// Action to add a feature with a complex value
export const addFeature = (key: string, value: any) => ({
  type: 'ADD_FEATURE',
  payload: {key, value},
});

export type RootState = ReturnType<typeof store.getState>;
