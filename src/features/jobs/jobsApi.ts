import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transformJobResponseData } from "../../utils";
import type { TransformedJobByLocationData, JobResponseData } from "./types";

export const jobsAPi = createApi({
  reducerPath: "jobs",
  // http://localhost:4000/db will get all the data from the mock.json file
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/db" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getJobsData: builder.query<TransformedJobByLocationData[], void>({
      query: () => `/`,
      transformResponse: (
        response: JobResponseData,
      ): TransformedJobByLocationData[] => {
        return transformJobResponseData(response.jobs, response.jobsByLocation);
      },
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobsDataQuery } = jobsAPi;
