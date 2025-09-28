import React, { Suspense } from "react";
import Link from "next/link";
import NextLink from "next/link";
import { Table } from "@radix-ui/themes";
import StatusBadge from "@/app/components/statusBadge";
import TableSkeleton from "../TableSkeleton";
import IssueFilter from "./issueFilter";
import { Issue, Status } from "@prisma/client";
import delay from "delay";
import prisma from "@/prisma/client";
import { IconArrowUp } from "@tabler/icons-react";
import Pagination from "@/app/components/pagination";

interface Props {
  // page: string to pagination table
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Date", value: "createdAt" },
  ];
  ////not working
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
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
          <Table.Root className="border border-[#e3dfe6] rounded-md my-5">
            <Table.Header>
              <Table.Row>
                {columns.map((column) => (
                  <Table.ColumnHeaderCell key={column.value}>
                    <NextLink href={`/issues/list?orderBy=${column.value}`}>
                      {column.label}
                    </NextLink>
                    {column.value === searchParams.orderBy && (
                      <IconArrowUp className="inline" />
                    )}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <StatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
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
