import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import IssueForm from "../../components/IssueForm";
interface Props {
  params: Promise<{ id: string }>; // ✅ تغيير هنا
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params; // ✅ إضافة await هنا

  //   if (typeof params.id !== "number") notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }, // ✅ استخدام id بدلاً من params.id
  });

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
