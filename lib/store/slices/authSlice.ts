import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import CryptoConvert from "crypto-convert";
import logger from "@/lib/logger";
import { InferAttributes } from "sequelize";
import { Users } from "@/database/models/users";
import { Transactions } from "@/database/models/transactions";

// Types
interface AuthState {
  user: InferAttributes<Users> | null;
  transaction: InferAttributes<Transactions> | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  transaction: null,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {},
    setUser: (state, action: PayloadAction<InferAttributes<Users> | null>) => {
      state.user = action.payload;
    },
    setTransaction: (
      state,
      action: PayloadAction<InferAttributes<Transactions> | null>
    ) => {
      state.transaction = action.payload;
    },
  },

  extraReducers: (builder) => {},
});

export default authSlice.reducer;
