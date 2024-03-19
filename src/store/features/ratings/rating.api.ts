import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AddRatingInterface, GetBookRatingInterface } from "./rating.interface";

export const ratingApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "ratingApi",
  tagTypes: ["rating"],
  endpoints: (build) => ({
    addRatingToBook: build.mutation({
      query: ({ rating, review, bookId, userId }: AddRatingInterface) => ({
        url: endpoints.book.addRatingToBook,
        body: { rating, review, bookId, userId },
        method: "POST",
      }),
    }),
    getUserRatingOnBook: build.query({
      query: ({ userId, bookId }: GetBookRatingInterface) => ({
        url: endpoints.book.getUserRatingOnBook({ userId, bookId }),
        method: "GET",
      }),
    }),
  }),
});

export const { useAddRatingToBookMutation, useGetUserRatingOnBookQuery } = ratingApi;
