import {
  type TransformedJobData,
  type JobData,
  type TransformedJobByLocationData,
  type JobByLocationData,
} from "../features/jobs/types";
import MOCK_DATA from "../../server/mock.json";
import {
  formatDate,
  calculateTimeRange,
  sortJobsByDate,
  sortLocationsByName,
  transformJobData,
  transformJobResponseData,
} from "./jobTransforms";

const JOB_DATA: JobData = {
  uuid: "c1ac51df-40bb-4ed5-b4eb-068ebd8d9bbf",
  amount: 96,
  currency: "CHF",
  executionDate: "2023-10-13 11:00",
  agent: "Oliveira Agent",
  contractPeriodicity: 7,
  floorAndDoor: "",
  locationComment: "foo bar",
  type: "HOME_CLEANING",
  duration: 3,
  location: "Fooweg 8",
  locationUuid: "9316889e-17ef-4ef6-a5e3-d487ed589d2d",
};

const JOB_DATA_TRANSFORMED: TransformedJobData = {
  uuid: "c1ac51df-40bb-4ed5-b4eb-068ebd8d9bbf",
  date: "FRI, Oct 13",
  time: "11:00 - 14:00",
  timestamp: 1697187600000,
  agent: "Oliveira Agent",
  repetition: "Weekly",
  type: "Home cleaning",
  locationUuid: "9316889e-17ef-4ef6-a5e3-d487ed589d2d",
};

describe("formatDate", () => {
  it("formats a date correctly", () => {
    const date = new Date("2023-09-20 08:30");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("WED, Sep 20");
  });
});

describe("calculateTimeRange", () => {
  it("calculates the time range correctly", () => {
    const startDate = new Date("2023-09-20 08:30");
    const duration = 2;
    const timeRange = calculateTimeRange(startDate, duration);
    expect(timeRange).toBe("08:30 - 10:30");
  });
});

describe("transformJobData", () => {
  it("transforms job data correctly", () => {
    const transformedJobData = transformJobData(JOB_DATA);
    expect(transformedJobData).toEqual(JOB_DATA_TRANSFORMED);
  });
});

describe("sortJobsByDate", () => {
  it("sorts jobs by date in ascending order", () => {
    const jobs = [
      { uuid: "1", timestamp: new Date("2023-09-20 08:30").getTime() },
      { uuid: "2", timestamp: new Date("2023-09-23 08:30").getTime() },
      { uuid: "3", timestamp: new Date("2023-09-19 08:30").getTime() },
    ];

    const sortedJobs = sortJobsByDate(jobs as TransformedJobData[]);

    expect(sortedJobs[0].uuid).toBe("3");
    expect(sortedJobs[1].uuid).toBe("1");
    expect(sortedJobs[2].uuid).toBe("2");
  });
});

describe("sortLocationsByName", () => {
  it("sorts locations by name in ascending order", () => {
    const locations = [
      { location: "B", uuid: "1" },
      { location: "A", uuid: "2" },
      { location: "C", uuid: "3" },
    ];

    const sortedLocations = sortLocationsByName(
      locations as TransformedJobByLocationData[],
    );

    expect(sortedLocations[0].uuid).toBe("2"); // A
    expect(sortedLocations[1].uuid).toBe("1"); // B
    expect(sortedLocations[2].uuid).toBe("3"); // C
  });
});

describe("transformJobResponseData", () => {
  it("transforms job response data correctly", () => {
    const jobData = MOCK_DATA["jobs"] as JobData[];
    const jobByLocationData = MOCK_DATA[
      "jobsByLocation"
    ] as JobByLocationData[];

    const transformedData = transformJobResponseData(
      jobData,
      jobByLocationData,
    );

    expect(transformedData[0].location).toBe("Foobar 9");
    expect(transformedData[0].jobs.length).toBe(jobByLocationData[1].total);

    expect(transformedData[1].location).toBe("Fooweg 8");
    expect(transformedData[1].jobs.length).toBe(jobByLocationData[0].total);
  });
});
