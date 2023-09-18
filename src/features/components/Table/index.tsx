import { type ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse font-medium">
        <thead className="border-b">
          <tr className="text-left">
            <th>Address</th>
            <th>Type</th>
            <th>Date & Time</th>
            <th>Repetition</th>
            <th>Batmaid</th>
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
};
