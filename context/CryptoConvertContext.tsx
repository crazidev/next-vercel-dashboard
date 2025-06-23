"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import CryptoConvert from "crypto-convert";
import logger from "@/lib/logger";
import { store, useAppDispatch, useAppSelector } from "@/lib/store/store";
import { isServer } from "@/lib/isServer";
import { cryptoConvertSlice } from "@/lib/store/slices/cryptoConvertSlice";

// // Define the context and types
interface CryptoConvertContextType {
  convert: CryptoConvert | null;
}

// export const CryptoConvertContext = createContext<
//   CryptoConvertContextType | undefined
// >(undefined);

// // Provider component
// export const CryptoConvertProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   var convert = store.getState().cryptoConvert.convert;

//   useEffect(() => {
//     if (!convert) {
//       try {
//         const cryptoConvertInstance = new CryptoConvert();
//         store.dispatch(
//           cryptoConvertSlice.actions.setCryptoConvert(cryptoConvertInstance)
//         );
//         console.log("Initializing CryptoConvert", store.getState());
//       } catch (error) {
//         logger("Unable to initialize CryptoConvert", error?.message);
//       }
//     }
//   }, [convert]);

//   return (
//     <CryptoConvertContext.Provider value={{ convert }}>
//       {children}
//     </CryptoConvertContext.Provider>
//   );
// };

// Custom hook to use the CryptoConvert context
export const useCryptoConvert = (): CryptoConvertContextType => {
  var convert = store.getState().cryptoConvert.convert;

  useEffect(() => {
    if (!convert) {
      try {
        const cryptoConvertInstance = new CryptoConvert();
        store.dispatch(
          cryptoConvertSlice.actions.setCryptoConvert(cryptoConvertInstance)
        );
        console.log("Initializing CryptoConvert", store.getState());
      } catch (error) {
        console.log("Unable to initialize CryptoConvert", error);
      }
    }
  }, [convert]);

  return {
    convert: convert as CryptoConvert,
  };
};
