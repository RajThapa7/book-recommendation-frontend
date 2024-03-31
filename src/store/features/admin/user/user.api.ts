import { endpoints } from "@/contants/endpoints";
import { AdminProtectedBaseQuery } from "@/store/base-query/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: AdminProtectedBaseQuery,
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: endpoints.admin?.getUser,
        method: "get",
      }),
      providesTags: ["User"],
    }),
  }),
});
export const { useGetAllUserQuery } = userApi;
