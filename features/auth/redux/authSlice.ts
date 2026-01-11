import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthTokens, UserProfile } from "@/features/auth/types";

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserProfile; tokens: AuthTokens }>
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
    },
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
      state.isAuthenticated = true;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      if (state.tokens) {
        state.tokens.access = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, setTokens, updateAccessToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
