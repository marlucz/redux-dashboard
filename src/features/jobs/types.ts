export const jobTypes = {
  HOME_CLEANING: "Home cleaning",
  END_OF_TENANCY: "End of Tenancy",
} as const;

export type JobTypesKeys = keyof typeof jobTypes;
export type JobType = (typeof jobTypes)[JobTypesKeys];

export interface JobData {
  uuid: string;
  amount: number;
  currency: string;
  executionDate: string;
  agent: string;
  contractPeriodicity: number;
  floorAndDoor: string;
  locationComment: string;
  type: JobTypesKeys;
  duration: number;
  location: string;
  locationUuid: string;
}

export interface JobByLocationData {
  location: string;
  total: number;
  jobs: JobData["uuid"];
  uuid: string;
  state: string;
  city: string;
}

export interface ResponseData {
  jobs: JobData[];
  jobsByLocation: JobByLocationData[];
}
