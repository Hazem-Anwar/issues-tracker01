"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
const IssuesPage = () => {
  return (
    <div className="container mx-auto">
      <Button>
       
        <Link href="/issues/new">New Isuue</Link>{" "}
      </Button>
    </div>
  );
};

export default IssuesPage;
