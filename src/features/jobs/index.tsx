import { Button } from "../../components/button";
import { useGetJobsDataQuery } from "./jobsApi";

const JobsBoard = () => {
  const { data, isLoading } = useGetJobsDataQuery();
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

      <div>{isLoading ? "Loading..." : "Data fetched!"}</div>
    </section>
  );
};

export { JobsBoard };