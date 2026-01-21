import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/features/auth/redux/authSlice";
import questionnaireReducer from "./slices/questionnaireSlice";

// Configure persist for auth only
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], // Only persist these fields
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  questionnaire: questionnaireReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
