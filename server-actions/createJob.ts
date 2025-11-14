/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { jobSchema } from "@/lib/validators/job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export async function createJob(formData: any) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return { error: "Not authenticated" };

  const parsed = jobSchema.safeParse(formData);
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.job.create({
    data: {
      ...parsed.data,
      ownerId: session.user.id,
    },
  });

  return { success: true };
}
