import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import CryptoConvert from "crypto-convert";
import logger from "@/lib/logger";

// Types
interface CryptoConvertState {
  convert: CryptoConvert | null;
  isInitialized: boolean;
  isReady: boolean;
  error: string | null;
  lastInitialized: string | null;
}

// Initial state
const initialState: CryptoConvertState = {
  convert: null,
  isInitialized: false,
  isReady: false,
  error: null,
  lastInitialized: null,
};

// Slice
export const cryptoConvertSlice = createSlice({
  name: "cryptoConvert",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    setCryptoConvert: (state, action: PayloadAction<CryptoConvert>) => {
      state.convert = action.payload;
      state.isInitialized = true;
      state.error = null;
      state.lastInitialized = new Date().toISOString();
    },
  },

  extraReducers: (builder) => {},
});

export default cryptoConvertSlice.reducer;
