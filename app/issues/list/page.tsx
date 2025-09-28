import React, { Suspense } from "react";
import Link from "next/link";
import TableSkeleton from "../TableSkeleton";
import IssueFilter from "./issueFilter";
import { Issue, Status } from "@prisma/client";
import delay from "delay";
import prisma from "@/prisma/client";
import Pagination from "@/app/components/pagination";
import IssueTable, { columnsName, issueQuery } from "./IssueTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue traker - List issues",
  description: "welcome back",
};

interface Props {
  // page: string to pagination table
  searchParams: issueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  ////not working
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "desc" }
    : undefined;
  //pagination table
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 8;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    //pagination table
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  //pagination table
  const issueNumber = await prisma.issue.count();
  await delay(1000);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <IssueFilter />
          <Link
            className="px-4 py-2 rounded-md text-white bg-blue-600"
            href="/issues/new"
          >
            New Isuue
          </Link>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <IssueTable searchParams={searchParams} issues={issues} />
        </Suspense>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueNumber}
        />
      </div>
    </>
  );
};

export default IssuesPage;
