import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./features/auth/auth.api";
import { bookApi } from "./features/book/book.api";
import userInfoSlice from "./features/user-info/user-info.slice";
import { ratingApi } from "./features/ratings/rating.api";
import { AdminBookApi } from "./features/admin/books/book.api";
import { userApi } from "./features/admin/user/user.api";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
    [AdminBookApi.reducerPath]: AdminBookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userInfo: userInfoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      authAPI.middleware,
      bookApi.middleware,
      ratingApi.middleware,
      AdminBookApi.middleware,
      userApi.middleware
    ),
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
// Store Dispatch Type
export type AppDispatch = typeof store.dispatch;
