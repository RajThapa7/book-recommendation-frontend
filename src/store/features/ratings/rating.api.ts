import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddRatingInterface,
  DeleteRatingInterface,
  GetBookRatingInterface,
} from "./rating.interface";

export const ratingApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "ratingApi",
  endpoints: (build) => ({
    addRatingToBook: build.mutation({
      query: ({ rating, review, bookId, userId }: AddRatingInterface) => ({
        url: endpoints.book.addRatingToBook,
        body: { rating, review, bookId, userId },
        method: "POST",
      }),
    }),
    getUserRatingOnBook: build.query({
      query: ({ userId, bookId, page_number }: GetBookRatingInterface) => ({
        url: endpoints.book.getUserRatingOnBook({
          userId,
          bookId,
          page_number,
        }),
        method: "GET",
      }),
    }),
    deleteRatings: build.mutation({
      query: ({ bookId, userId }: DeleteRatingInterface) => ({
        url: endpoints.book.deleteUserRatingOnBook,
        body: {
          bookId,
          userId,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddRatingToBookMutation,
  useGetUserRatingOnBookQuery,
  useDeleteRatingsMutation,
} = ratingApi;