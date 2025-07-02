import EditIssueButton from "./EditIssueButton";
import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import React from "react";
import SingleIssueDetails from "./SingleIssueDetails";
// import DeleteIssueButton from "./DeleteIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";

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
        <SingleIssueDetails issue={issue}></SingleIssueDetails>
        <div className="p-3 border-b border-[#ccc] prose flex items-center gap-3">
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
