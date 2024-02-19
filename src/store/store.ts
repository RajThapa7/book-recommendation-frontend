import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./features/auth/auth.api";
import { bookApi } from "./features/book/book.api";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [bookApi.reducerPath]: bookApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      authAPI.middleware,
      bookApi.middleware
    ),
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
// Store Dispatch Type
export type AppDispatch = typeof store.dispatch;
