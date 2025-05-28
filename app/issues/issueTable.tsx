import React from "react";
import prisma from "@/prisma/client";
import StatusBadge from "../components/statusBadge";
import { Table } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
const IssueTable = async () => {
  const issues = await prisma.issue.findMany();
  await delay(1000);

  return (
    <Table.Root className="border border-[#e3dfe6] rounded-md my-5">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
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
  );
};

export default IssueTable;
