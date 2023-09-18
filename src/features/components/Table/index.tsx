import { type ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="min-w-full border-collapse font-medium">
      <thead className="border-b">
        <tr className="text-left">
          <th colSpan={2}>Address</th>
          <th>Type</th>
          <th>Date & Time</th>
          <th>Repetition</th>
          <th>Batmaid</th>
        </tr>
      </thead>
      {children}
    </table>
  );
};
