import StatusBadge from "@/app/components/statusBadge";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <div className="container mx-auto">
      <div className="issue-box rounded-md border border-[#ccc] max-w-xl">
        <p className="p-3 border-b border-[#ccc] flex items-center justify-between">
          {issue.title}
          <StatusBadge status={issue.status}></StatusBadge>
        </p>
        <div className="p-3 border-b border-[#ccc] prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>

        <p className="p-3 ">{issue.createdAt.toDateString()}</p>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
