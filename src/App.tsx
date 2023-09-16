import { Button } from "./components/button";

export function App() {
  return (
    <main className="grid h-full place-content-center">
      <div className="flex">
        <Button variant={"outline"} className="rounded-r-none">
          Previous
        </Button>
        <Button className="rounded-l-none">Upcoming</Button>
      </div>
    </main>
  );
}
