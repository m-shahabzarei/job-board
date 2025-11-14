/* eslint-disable @typescript-eslint/no-explicit-any */

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/nextAuth";
// import { jobSchema } from "@/lib/validators/job";

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const search = url.searchParams.get("q") || "";
//   const contract = url.searchParams.get("contract") || undefined;
//   const city = url.searchParams.get("city") || undefined;
//   const page = Number(url.searchParams.get("page") || 1);
//   const pageSize = 10;

//   const where: any = {
//     title: { contains: search, mode: "insensitive" },
//   };
//   if (contract) where.contractType = contract;
//   if (city) where.location = { contains: city, mode: "insensitive" };

//   const [items, total] = await Promise.all([
//     prisma.job.findMany({
//       where,
//       orderBy: { postedAt: "desc" },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     }),
//     prisma.job.count({ where }),
//   ]);

//   return NextResponse.json({ items, total });
// }

// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions as any);
//   if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

//   const body = await request.json();
//   const parsed = jobSchema.safeParse(body);
//   if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

//   const created = await prisma.job.create({
//     data: {
//       ...parsed.data,
//       owner: { connect: { email: session.user.email } },
//     },
//   });
//   return NextResponse.json(created);
// }



import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { jobSchema } from "@/lib/validators/job";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("q") || "";
  const contract = url.searchParams.get("contract") || undefined;
  const city = url.searchParams.get("city") || undefined;
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = 10;

  const where: any = {
    title: { contains: search, mode: "insensitive" },
  };
  if (contract) where.contract = contract;   // اصلاح شده
  if (city) where.location = { contains: city, mode: "insensitive" };

  const [items, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { postedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.job.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return new NextResponse("Unauthorized", { status: 401 });

  const body = await request.json();
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const created = await prisma.job.create({
    data: {
      ...parsed.data,
      owner: { connect: { email: session.user.email } },
    },
  });

  return NextResponse.json(created);
}
