"use client";

import { useState, useEffect } from "react";
import CryptoConvert from "crypto-convert";
import { isServer } from "@/lib/isServer";
import { store } from "@/lib/store/store";
import { cryptoConvertSlice } from "@/lib/store/slices/cryptoConvertSlice";

// Define the context and types
interface CryptoConvertContextType {
  convert: CryptoConvert | null;
}

// Alternative simpler approach - Singleton pattern
class CryptoConvertSingleton {
  private static instance: CryptoConvert | null = null;
  private static isInitialized = false;

  static getInstance(): CryptoConvert | null {
    if (!this.isInitialized && !this.instance) {
      try {
        this.instance = new CryptoConvert();
        this.isInitialized = true;
        console.log("Successfully initialized CryptoConvert singleton");
      } catch (error) {
        console.error("Unable to initialize CryptoConvert", error);
        this.isInitialized = true; // Mark as attempted to prevent retries
      }
    }
    return this.instance;
  }
}

export const useCryptoConvert = (): CryptoConvertContextType => {
  const [convert, setConvert] = useState<CryptoConvert | null>(null);

  useEffect(() => {
    if (isServer()) return;

    const instance = CryptoConvertSingleton.getInstance();
    store.dispatch(cryptoConvertSlice.actions.setCryptoConvert(instance));
    setConvert(instance);
  }, []);

  return { convert };
};
