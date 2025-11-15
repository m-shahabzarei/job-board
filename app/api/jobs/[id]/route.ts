// @ts-nocheck


import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = context.params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (job.ownerId !== session.user.id) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  await prisma.job.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
