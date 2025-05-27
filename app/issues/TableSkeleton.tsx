import React from "react";
import { Table } from "@radix-ui/themes";

const TableSkeleton = () => {
  return (
    <Table.Root className="w-full border border-[#e3dfe6] rounded-md mt-4 animate-pulse">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="p-2 text-left">Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="p-2 text-left">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="p-2 text-left">Date</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[...Array(10)].map((_, i) => (
          <Table.Row key={i} className="border-t border-[#e3dfe6]">
            <Table.RowHeaderCell className="p-2">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="p-2">
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="p-2">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            </Table.RowHeaderCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableSkeleton;
