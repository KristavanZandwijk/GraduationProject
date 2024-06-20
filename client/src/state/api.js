import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Building"],
  endpoints: (build) => ({
    getBuilding: build.query({
      query: () => "buildingdataspace",
      providesTags: ["Building"],
    }),
  }),
});

export const {
  useGetBuildingQuery,
} = api;
