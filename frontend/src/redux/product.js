import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_BASE_KEY = import.meta.env.VITE_BASE_KEY;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${VITE_BASE_KEY}/api/` }),
  endpoints: (builder) => ({
    getproductByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
});

export const { useGetproductByNameQuery } = productApi;
