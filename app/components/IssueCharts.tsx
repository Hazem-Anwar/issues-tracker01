"use client";

import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "InProgress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar barSize={20} fill="blue" dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueCharts;
