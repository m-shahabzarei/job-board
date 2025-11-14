
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(job);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.job.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
