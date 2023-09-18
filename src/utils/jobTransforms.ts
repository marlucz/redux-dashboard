import {
  repetitionTypes,
  jobTypes,
  type JobByLocationData,
  type JobData,
  type TransformedJobByLocationData,
  type TransformedJobData,
} from "../features/jobs/types";

const HOURS_TO_MILLISECONDS = 60 * 60 * 1000;

export function formatDate(date: Date): string {
  const month = date.toLocaleString("en-US", { month: "short" });
  const dayName = date
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  const dayInMonth = date.getDate();

  return `${dayName}, ${month} ${dayInMonth}`;
}

export function calculateTimeRange(startDate: Date, duration: number): string {
  const endDate = new Date(
    startDate.getTime() + duration * HOURS_TO_MILLISECONDS,
  );

  // en-US adds PM/AM to the time, so en-GB is used instead
  const startTime = startDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endTime = endDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${startTime} - ${endTime}`;
}

export function sortJobsByDate(
  jobs: TransformedJobData[],
): TransformedJobData[] {
  return jobs.sort(({ timestamp: timestampA }, { timestamp: timestampB }) => {
    return timestampA - timestampB;
  });
}

export function sortLocationsByName(
  locations: TransformedJobByLocationData[],
): TransformedJobByLocationData[] {
  return locations.sort(({ location: locationA }, { location: locationB }) => {
    return locationA.localeCompare(locationB);
  });
}

export function transformJobData(job: JobData): TransformedJobData {
  const date = new Date(job.executionDate);

  return {
    uuid: job.uuid,
    date: formatDate(date),
    time: calculateTimeRange(date, job.duration),
    timestamp: date.getTime(),
    agent: job.agent,
    repetition: repetitionTypes[job.contractPeriodicity],
    type: jobTypes[job.type],
    locationUuid: job.locationUuid,
  };
}

export function transformJobResponseData(
  jobData: JobData[],
  jobByLocationData: JobByLocationData[],
): TransformedJobByLocationData[] {
  const transformedJobsData: TransformedJobByLocationData[] = [];

  jobByLocationData.forEach((jobByLocation) => {
    const jobs = jobByLocation.jobs.map((jobUuid) => {
      const job = jobData.find((job) => job.uuid === jobUuid);

      if (!job) {
        throw new Error(`Job with uuid ${jobUuid} not found`);
      }

      return transformJobData(job);
    });

    transformedJobsData.push({
      location: jobByLocation.location,
      jobs: sortJobsByDate(jobs),
      uuid: jobByLocation.uuid,
    });
  });

  return sortLocationsByName(transformedJobsData);
}
