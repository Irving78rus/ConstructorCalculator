import { configureStore } from "@reduxjs/toolkit";
import calculatorSlice from "./calculatorSlice";

export const store = configureStore({
  reducer: {
    calculatorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
