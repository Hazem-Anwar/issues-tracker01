import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/Edit`}>
      <button className="px-6 py-2 rounded-md bg-amber-400 cursor-pointer text-white">
        Edit issue
      </button>
    </Link>
  );
};

export default EditIssueButton;
