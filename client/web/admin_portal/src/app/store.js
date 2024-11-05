import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import tableReducer from './tableSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    table: tableReducer,
  },
});

export { store };
