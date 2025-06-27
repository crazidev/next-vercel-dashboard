"use client";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cryptoConvertReducer from "./slices/cryptoConvertSlice";

export const store = configureStore({
  reducer: {
    cryptoConvert: cryptoConvertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore CryptoConvert instance in serialization check
        ignoredActions: ["cryptoConvert/setCryptoConvert"],
        ignoredPaths: ["cryptoConvert/setCryptoConvert"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
