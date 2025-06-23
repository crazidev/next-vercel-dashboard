"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
  initializeCryptoConvert,
  selectCryptoConvert,
  selectIsInitialized,
  selectCryptoConvertLoading,
  selectCryptoConvertError,
  clearError,
} from "@/lib/store/slices/cryptoConvertSlice";

export const useCryptoConvert = () => {
  const dispatch = useAppDispatch();
  const convert = useAppSelector(selectCryptoConvert);
  const isInitialized = useAppSelector(selectIsInitialized);
  const loading = useAppSelector(selectCryptoConvertLoading);
  const error = useAppSelector(selectCryptoConvertError);

  useEffect(() => {
    if (!isInitialized && !loading && !convert) {
      dispatch(initializeCryptoConvert());
    }
  }, [dispatch, isInitialized, loading, convert]);

  const retry = () => {
    dispatch(clearError());
    dispatch(initializeCryptoConvert());
  };

  // Throw error if convert is not available (matching original context behavior)
  if (!convert && !loading && !error) {
    throw new Error("CryptoConvert is not initialized");
  }

  return {
    convert,
    isInitialized,
    loading,
    error,
    retry,
  };
};
