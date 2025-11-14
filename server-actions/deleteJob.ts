"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export async function deleteJob(jobId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Not authenticated" };

  // بررسی اینکه کاربر مالک شغل هست
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return { error: "Job not found" };
  if (job.ownerId !== session.user.id) return { error: "Unauthorized" };

  await prisma.job.delete({ where: { id: jobId } });
  return { success: true };
}
