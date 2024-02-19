import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/contants/endpoints";
import { protectedBaseQuery } from "@/store/base-query/base-query";
import { LoginFormInterface, SignUpFormInterface } from "./auth.interface";

export const authAPI: any = createApi({
    baseQuery: protectedBaseQuery,
    reducerPath: "authApi",
    tagTypes: ["auth"],
    endpoints: (build) => ({
        login: build.mutation({
            query: (signInData: LoginFormInterface) => ({
                url: endpoints.auth.login,
                body: signInData,
                method: "POST",
            }),
        }),
        signup: build.mutation({
            query: (signupData: SignUpFormInterface) => ({
                url: endpoints.auth.register,
                body: signupData,
                method: "POST",
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: endpoints.auth.logout,
                method: "POST",
            }),
        }),
        getToken: build.query({
            query: () => ({
                url: endpoints.auth.authSuccess,
                method: "GET",
            }),
        })
    }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useGetTokenQuery } = authAPI;
