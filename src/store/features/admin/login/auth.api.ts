import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { LoginFormInterface } from "../../auth/auth.interface";

export const adminLoginApi = createApi({
  baseQuery: protectedBaseQuery,
  reducerPath: "adminLoginApi",
  tagTypes: ["adminAuth"],
  endpoints: (build) => ({
    adminLogin: build.mutation({
      query: (signInData: LoginFormInterface) => ({
        url: endpoints.admin.login,
        body: signInData,
        method: "POST",
      }),
    }),
  }),
});

export const { useAdminLoginMutation } = adminLoginApi;
