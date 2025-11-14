/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { jobSchema, JobInput } from "@/lib/validators/job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export async function createJob(formData: JobInput) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return { error: "Not authenticated" };

  // Parse the data using Zod
  const parsed = jobSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data", issues: parsed.error.format() };

  try {
    await prisma.job.create({
      data: {
        ...parsed.data,
        ownerId: session.user.id, // مطمئن شو id کاربر از session هست
      },
    });
  } catch (err: any) {
    console.error("Prisma create job error:", err);
    return { error: "Database error" };
  }

  return { success: true };
}
