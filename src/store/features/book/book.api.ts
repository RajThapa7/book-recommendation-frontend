import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AddBookToListInterface,
  RemoveBookInterface,
  SearchBookFilter,
} from "./book.interface";

export const bookApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "bookApi",
  tagTypes: ["book"],
  endpoints: (build) => ({
    getSearchedBooks: build.query({
      query: ({ search, optionValue, limit, page }: SearchBookFilter) => ({
        url: endpoints.book.searchBookList(search, optionValue, page, limit),
        method: "GET",
      }),
    }),
    getBooks: build.query({
      query: () => ({
        url: endpoints.book.getAllBookList,
        method: "GET",
      }),
    }),
    getBookRecommendations: build.query({
      query: ({ id }: { id?: string | number }) => ({
        url: endpoints.book.getBooksRecommendation(id),
        method: "GET",
      }),
    }),
    getBookById: build.query({
      query: ({ id }: { id: string | number }) => ({
        url: endpoints.book.getBookById(id),
        method: "GET",
      }),
    }),
    getSavedBooks: build.query({
      query: ({ id }: { id: string | number }) => ({
        url: endpoints.book.getSavedList(id),
        method: "GET",
      }),
    }),
    addBookToList: build.mutation({
      query: ({ book_id, user_id }: AddBookToListInterface) => ({
        url: endpoints.book.addBookToList,
        body: { book_id, user_id },
        method: "POST",
      }),
    }),
    removeSavedBookFromList: build.mutation({
      query: ({
        id,
        book_id,
        payload,
      }: {
        id: string;
        book_id: string;
        payload: RemoveBookInterface;
      }) => ({
        url: endpoints.book.removeBookFromList({ id, book_id }),
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetSearchedBooksQuery,
  useGetBookRecommendationsQuery,
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookToListMutation,
  useRemoveSavedBookFromListMutation,
  useGetSavedBooksQuery,
} = bookApi;
