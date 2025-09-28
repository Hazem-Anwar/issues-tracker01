"use client";

import { Button } from "@radix-ui/themes";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <h6>
        page {currentPage} of {pageCount}
      </h6>
      <Button
        onClick={() => changePage(1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <IconChevronsLeft />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
      >
        <IconChevronLeft />
      </Button>

      <Button
        onClick={() => changePage(currentPage + 1)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <IconChevronRight />
      </Button>

      <Button
        onClick={() => changePage(pageCount)}
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
      >
        <IconChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
