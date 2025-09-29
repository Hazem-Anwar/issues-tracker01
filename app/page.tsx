import prisma from "@/prisma/client";
import IssuesSummary from "./components/IssuesSummary";
import LatestIssues from "./components/LatestIssues";
import IssueCharts from "./components/IssueCharts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue traker - dashboard",
  description: "welcome back",
};

export default async function Home() {
  /// to fetch issues status number
  const Open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  ///
  return (
    <main className="container mx-auto">
      <div className="flex">
        <div className="w-1/2">
          <IssuesSummary open={Open} inProgress={inProgress} closed={closed} />
        </div>
        <div className="w-1/2">
          {" "}
          <IssueCharts open={Open} inProgress={2} closed={4} />
        </div>
      </div>

      <LatestIssues />
    </main>
  );
}
