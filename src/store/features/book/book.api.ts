import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AddBookToListInterface, SearchBookFilter } from "./book.interface";

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
      providesTags: ["book"],
    }),
    getBooks: build.query({
      query: () => ({
        url: endpoints.book.getAllBookList,
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    getBookRecommendations: build.query({
      query: ({ id }: { id?: string | number }) => ({
        url: endpoints.book.getBooksRecommendation(id),
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    getBookById: build.query({
      query: ({ id }: { id: string | number }) => ({
        url: endpoints.book.getBookById(id),
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    getSavedBooks: build.query({
      query: ({ id }: { id: string | number }) => ({
        url: endpoints.book.getSavedList(id),
        method: "GET",
      }),
      providesTags: ["book"],
    }),
    addBookToList: build.mutation({
      query: ({ userId, bookId }: AddBookToListInterface) => ({
        url: endpoints.book.addBookToList,
        body: { userId, bookId },
        method: "POST",
      }),
      invalidatesTags: ["book"],
    }),
    removeSavedBookFromList: build.mutation({
      query: ({ user_id, book_id }: { user_id: string; book_id: string }) => ({
        url: endpoints.book.removeBookFromList({ user_id, book_id }),
        method: "PATCH",
      }),
      invalidatesTags: ["book"],
    }),
    recomendationOfBook: build.mutation({
      query: ({ author, title }: { author: string; title: string }) => ({
        url: endpoints.book.recommendBook,
        body: { author, title },
        method: "POST",
      }),
      invalidatesTags: ["book"],
    }),
    listRelatedBooks: build.mutation({
      query: ({ books }: { books: any }) => ({
        url: endpoints.book.listRecommendation,
        body: { books },
        method: "POST",
      }),
      invalidatesTags: ["book"],
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
  useRecomendationOfBookMutation,
  useListRelatedBooksMutation
} = bookApi;
