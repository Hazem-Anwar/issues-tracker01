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
  searchParams: Promise<issueQuery>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams; // ✅ إضافة await هنا

  ////not working
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;

  const orderBy = columnsName.includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: "desc" }
    : undefined;
  //pagination table
  const page = Number(resolvedSearchParams.page) || 1;
  const pageSize = 4;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { id: "desc" }, // تأكد ثابت
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueNumber = await prisma.issue.count({ where: { status } });

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
        {/* <Suspense fallback={<TableSkeleton />}>
          <IssueTable searchParams={resolvedSearchParams} issues={issues} />
        </Suspense> */}
        <IssueTable searchParams={resolvedSearchParams} issues={issues} />
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
