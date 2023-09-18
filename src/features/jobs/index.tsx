import { useMemo, useState } from "react";

import { cn } from "../../utils";
import { Table } from "../components/Table";
import { TableSkeleton } from "../components/TableSkeleton";
import { TableNavButton } from "../components/TableNavButton";
import { useGetJobsDataQuery } from "./jobsApi";

const JobsBoard = () => {
  const { data, isLoading, isError } = useGetJobsDataQuery();
  const [jobsState, setJobsState] = useState<"upcoming" | "previous">(
    "upcoming",
  );

  const displayedJobs = useMemo(() => {
    if (!data) return [];

    const currentDate = new Date().getTime();

    return data.map((job) => ({
      ...job,
      jobs: job.jobs.filter((job) =>
        jobsState === "upcoming"
          ? job.timestamp > currentDate
          : job.timestamp < currentDate,
      ),
    }));
  }, [data, jobsState]);

  return (
    <section>
      <header>
        <h1 className="mb-8 text-2xl font-semibold">All my cleanings</h1>
      </header>
      <div className="mb-6 flex">
        <TableNavButton
          isActive={jobsState === "previous"}
          onClick={() => setJobsState("previous")}
          className="rounded-r-none"
        >
          Previous
        </TableNavButton>
        <TableNavButton
          isActive={jobsState === "upcoming"}
          onClick={() => setJobsState("upcoming")}
          className="rounded-l-none"
        >
          Upcoming
        </TableNavButton>
      </div>

      <Table>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          displayedJobs?.map((jobData, loactionIndex) => (
            <tbody
              key={jobData.uuid}
              className={cn(loactionIndex !== 0 && "border-t")}
            >
              {jobData.jobs.map(
                ({ uuid, agent, date, repetition, time, type }, index) => (
                  <tr key={uuid}>
                    <td>{index === 0 ? jobData.location : undefined}</td>
                    <td>{type}</td>
                    <td>
                      <p>{date}</p>
                      <p>{time}</p>
                    </td>
                    <td>{repetition}</td>
                    <td>{agent}</td>
                  </tr>
                ),
              )}
            </tbody>
          ))
        )}
      </Table>
      {isError && (
        <div className="text-error">
          <p>Oh no, there was an error!</p>
        </div>
      )}
    </section>
  );
};

export { JobsBoard };
