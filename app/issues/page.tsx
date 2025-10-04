// "use client";
import React, { Suspense } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueTable from "./issueTable";
import TableSkeleton from "./TableSkeleton";
import IssuesSummary from "../components/IssuesSummary";
import LatestIssues from "../components/LatestIssues";

const IssuesPage = () => {
  return (
    <div className="container mx-auto">
      <Link
        className="px-4 py-2 rounded-md text-white bg-blue-600"
        href="/issues/new"
      >
        New Isuue
      </Link>
      <Suspense fallback={<TableSkeleton />}>
        <div className="mt-6">
          <LatestIssues />
        </div>
      </Suspense>
    </div>
  );
};

export default IssuesPage;
