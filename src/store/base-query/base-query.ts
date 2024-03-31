import { baseURL } from "@/contants/endpoints";
import { prepareAdminProtectedHeader, prepareProtectedHeader } from "@/lib/prepare.header";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const protectedBaseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: prepareProtectedHeader,
});
export const AdminProtectedBaseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: prepareAdminProtectedHeader,
});
