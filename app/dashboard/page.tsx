/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import prisma from "@/lib/prisma";
import JobForm from "@/components/JobForm";
import Link from "next/link";
import JobCard from "@/components/JobCard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions as any);

  if (!session || !session.user) {
    return (
      <div>
        Please Login to your Account. {" "}
        <Link href="/api/auth/signin" className="text-blue-600">SignIn</Link>
      </div>
    );
  }

  const jobs = await prisma.job.findMany({
    where: { ownerId: session.user.id },
    orderBy: { postedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Dashboard</h1>

      <div className="mt-6 mb-6">
        <h2 className="font-semibold">Creating a new job</h2>
        <JobForm />
      </div>

        <br/>
        <h2>Your Jobs</h2>
        <br/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <JobCard
  key={job.id}
  job={job}
  sessionUserId={session.user.id}

/>

        ))}
      </div>
    </div>
  );
}
