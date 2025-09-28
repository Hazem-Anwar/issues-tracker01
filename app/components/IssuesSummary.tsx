import { Status } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssuesSummary = ({ open, inProgress, closed }: Props) => {
  const Containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In_progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <div>
      <div className="grid items-center mb-5 gap-4">
        {Containers.map((container) => (
          <Link href={`/issues/list?status=${container.status}`}>
            <div className="card py-3 px-4 border border-gray-300 rounded-xl">
              <h3>{container.label}</h3>
              <h1>{container.value}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IssuesSummary;
