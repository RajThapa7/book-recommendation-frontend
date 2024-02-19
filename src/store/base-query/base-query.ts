import { baseURL } from "@/contants/endpoints";
import { prepareProtectedHeader } from "@/lib/prepare.header";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const protectedBaseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: prepareProtectedHeader,
});
