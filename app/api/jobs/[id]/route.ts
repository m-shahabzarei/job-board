
// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   const job = await prisma.job.findUnique({ where: { id: params.id } });
//   if (!job) return new NextResponse("Not found", { status: 404 });
//   return NextResponse.json(job);
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   await prisma.job.delete({ where: { id: params.id } });
//   return new NextResponse(null, { status: 204 });
// }


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return new NextResponse("Not found", { status: 404 });

  if (job.ownerId !== session.user.id) return new NextResponse("Forbidden", { status: 403 });

  await prisma.job.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
