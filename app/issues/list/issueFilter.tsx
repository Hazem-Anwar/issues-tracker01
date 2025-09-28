"use client";

import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueFilter = () => {
  const router = useRouter();
  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <button
          key={status.label}
          value={status.value}
          onClick={() => {
            const query = status.value ? `?status=${status.value}` : "";
            router.push("/issues/list" + query);
          }}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default IssueFilter;
