import { configureStore } from '@reduxjs/toolkit';
import assemblySlice from './assemblySlice';
import calculatorSlice from './calculatorSlice';
import constructorSlice from './constructorSlice';

export const store = configureStore({
  reducer: {
     calculatorSlice,
     assemblySlice,
     constructorSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;