import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const AdminBookApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "AdminBookApi",
  tagTypes: ["AdminBook"],
  endpoints: (build) => ({
    addBook: build.mutation<any, any>({
      query: (data: any) => ({
        url: endpoints.admin?.addBook,
        body: data?.data,
        method: "POST",
      }),
      invalidatesTags: ["AdminBook"],
    }),
    getAllBooks: build.query({
      query: ({ limit, page }: any) => ({
        url: endpoints.admin.getAllBooks(page, limit),
        method: "get",
      }),
      providesTags: ["AdminBook"],
    }),
    getSingleBook: build.query({
      query: (id: string) => ({
        url: endpoints?.admin?.getAllBooks + "/" + id,
        method: "get",
      }),
    }),
    bookUpdate: build.mutation<any, any>({
      query: ({ id, data }: { id: string | number; data: any }) => ({
        url: endpoints?.admin?.getAllBooks + "/" + id,
        body: data?.data,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminBook"],
    }),
    bookDelete: build.mutation<any, any>({
      query: ({ id }: { id: string | number }) => ({
        url: endpoints?.admin?.deleteBook(id),
        method: "DELETE",
      }),
      invalidatesTags: ["AdminBook"],
    }),
  }),
});
export const {
  useAddBookMutation,
  useBookDeleteMutation,
  useGetSingleBookQuery,
  useBookUpdateMutation,
  useGetAllBooksQuery,
} = AdminBookApi;
