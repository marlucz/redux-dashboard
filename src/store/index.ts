import { configureStore } from "@reduxjs/toolkit";
import { jobsAPi } from "../features/jobs/jobsApi";

export const store = configureStore({
  reducer: {
    [jobsAPi.reducerPath]: jobsAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsAPi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
