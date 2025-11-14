/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from "next/link";

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold">
        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
      </h3>
      <p className="text-sm text-gray-600">{job.contract} • {job.location}</p>
      <p className="mt-2 text-sm line-clamp-3">{job.description}</p>
    </div>
  );
}
