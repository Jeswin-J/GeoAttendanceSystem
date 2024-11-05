import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import tableReducer from './tableSlice';
import locationReducer from './locationSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    table: tableReducer,
    locations: locationReducer,
  },
});

export { store };
