import StatusBadge from "@/app/components/statusBadge";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { IconArrowUp } from "@tabler/icons-react";
import Link from "next/link";
import NextLink from "next/link";
import React from "react";
export interface issueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  // page: string to pagination table
  searchParams: issueQuery;
  issues: Issue[];
}

const columns: { label: string; value: keyof Issue }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "Date", value: "createdAt" },
];

export const columnsName = columns.map((columns) => columns.value);
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default IssueTable;
