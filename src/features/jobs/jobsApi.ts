import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ResponseData } from "./types";

// Define a service using a base URL and expected endpoints
export const jobsAPi = createApi({
  reducerPath: "jobsAPi",
  // http://localhost:4000/db will get all the data from the mock.json file
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/db" }),
  endpoints: (builder) => ({
    getJobsData: builder.query<ResponseData, void>({
      query: () => `/`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJobsDataQuery } = jobsAPi;
