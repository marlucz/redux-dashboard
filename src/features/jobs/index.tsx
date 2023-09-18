import { Button } from "../../components/button";
import { cn } from "../../utils";
import { Table } from "../components/Table";
import { TableSkeleton } from "../components/TableSkeleton";
import { useGetJobsDataQuery } from "./jobsApi";

const JobsBoard = () => {
  const { data, isLoading, isError } = useGetJobsDataQuery();

  console.log(data);
  return (
    <section>
      <header>
        <h1 className="mb-8 text-2xl font-semibold">All my cleanings</h1>
      </header>
      <div className="mb-6 flex">
        <Button variant={"outline"} className="rounded-r-none">
          Previous
        </Button>
        <Button className="rounded-l-none">Upcoming</Button>
      </div>

      <Table>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          data?.map((jobData, loactionIndex) => (
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
