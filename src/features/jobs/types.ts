export const jobTypes = {
  HOME_CLEANING: "Home cleaning",
  END_OF_TENANCY: "End of Tenancy",
} as const;

export type JobTypesKeys = keyof typeof jobTypes;
export type JobType = (typeof jobTypes)[JobTypesKeys];

export const repetitionTypes = {
  7: "Weekly",
  14: "Every two weeks",
  28: "Monthly",
} as const;

export type RepetitionTypesKeys = keyof typeof repetitionTypes;
export type RepetitionType = (typeof repetitionTypes)[RepetitionTypesKeys];

export interface JobData {
  uuid: string;
  amount: number;
  currency: string;
  executionDate: string;
  agent: string;
  contractPeriodicity: RepetitionTypesKeys;
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
  jobs: JobData["uuid"][];
  uuid: string;
  state: string;
  city: string;
}

export interface JobResponseData {
  jobs: JobData[];
  jobsByLocation: JobByLocationData[];
}

export interface TransformedJobData {
  uuid: string;
  date: string;
  time: string;
  timestamp: number;
  agent: string;
  repetition: RepetitionType;
  type: JobType;
  locationUuid: string;
}

export interface TransformedJobByLocationData {
  location: string;
  jobs: TransformedJobData[];
  uuid: string;
}
