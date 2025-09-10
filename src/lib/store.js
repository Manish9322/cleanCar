
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { aquaShineApi } from './api';

export const store = configureStore({
  reducer: {
    [aquaShineApi.reducerPath]: aquaShineApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aquaShineApi.middleware),
});

setupListeners(store.dispatch);
