import StatusBadge from "@/app/components/statusBadge";
import { Issue } from "@prisma/client";
import React from "react";
import ReactMarkdown from "react-markdown";

const SingleIssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <p className="p-3 border-b border-[#ccc] flex items-center justify-between">
        {issue.title}
        <StatusBadge status={issue.status}></StatusBadge>
      </p>
      <div className="p-3 border-b border-[#ccc] prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </div>
      <div className="p-3 border-b border-[#ccc] prose">
        <p className="p-3 ">{issue.createdAt.toDateString()}</p>
      </div>
    </div>
  );
};

export default SingleIssueDetails;
