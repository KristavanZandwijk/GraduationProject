import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "User2", "User3"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getUser2: build.query({
      query: () => "settings/user",
      providesTags: ["User2"],
    }),
    getUser3: build.query({
      query: () => "login/user",
      providesTags: ["User3"],
    })
  }),
});

export const {
  useGetUserQuery,
  useGetUser2Query,
  useGetUser3Query
} = api;