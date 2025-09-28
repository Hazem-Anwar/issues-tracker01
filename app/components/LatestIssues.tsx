import React from "react";
import prisma from "@/prisma/client";
import StatusBadge from "./statusBadge";
import Link from "next/link";
import Image from "next/image";
const LatestIssues = async () => {
  const issue = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <>
      <div className="issuesContainer">
        <h3 className="text-xl font-bold mb-4">
          Just check the latest issues :{" "}
        </h3>
        {issue.map((issue) => (
          <div
            key={issue.id}
            className="card py-3 px-4 rounded-xl mb-2 border-1 border-gray-300 flex items-center justify-between"
          >
            <Link href={`issues/${issue.id}`}>
              <h5>{issue.title}</h5>
            </Link>
            <div className="flex items-center gap-3">
              <StatusBadge status={issue.status} />
              {issue.assignedToUser && (
                <Image
                  src={issue.assignedToUser.image!}
                  alt={issue.assignedToUser.name || "no alt here"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestIssues;
