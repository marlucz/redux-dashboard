const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;

export const data = {
  jobs: [
    // UPCOMING JOB
    {
      uuid: "c1ac51df-40bb-4ed5-b4eb-068ebd8d9bbf",
      amount: 96,
      currency: "CHF",
      executionDate: new Date(Date.now() + THREE_DAYS),
      agent: "Oliveira Agent",
      contractPeriodicity: 7,
      floorAndDoor: "",
      locationComment: "foo bar",
      type: "HOME_CLEANING",
      duration: 3,
      location: "Fooweg 8",
      locationUuid: "9316889e-17ef-4ef6-a5e3-d487ed589d2d",
    },
    // PREVIOUS JOB
    {
      uuid: "5372cb01-88d4-4489-8fdd-93a80e25e8ba",
      amount: 64,
      currency: "CHF",
      executionDate: new Date(Date.now() - THREE_DAYS),
      agent: "Jessica Agent",
      contractPeriodicity: 28,
      floorAndDoor: "",
      locationComment: "",
      type: "HOME_CLEANING",
      duration: 2,
      location: "Foobar 9",
      locationUuid: "f97baa38-d427-43c2-b09e-f740230050ee",
    },
  ],
  jobsByLocation: [
    {
      location: "Fooweg 8",
      total: 1,
      jobs: ["c1ac51df-40bb-4ed5-b4eb-068ebd8d9bbf"],
      uuid: "9316889e-17ef-4ef6-a5e3-d487ed589d2d",
      state: "ZH",
      city: "Zurich",
    },
    {
      location: "Foobar 9",
      total: 1,
      jobs: ["5372cb01-88d4-4489-8fdd-93a80e25e8ba"],
      uuid: "f97baa38-d427-43c2-b09e-f740230050ee",
      state: "ZH",
      city: "Zurich",
    },
  ],
};
