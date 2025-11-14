/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { deleteJob } from "@/server-actions/deleteJob";
import { toast } from "react-hot-toast";

export default function JobCard({
  job,
  sessionUserId,
  onDeleted,
}: {
  job: any;
  sessionUserId?: string;
  onDeleted?: () => void;
}) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const res = await deleteJob(job.id);
    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Job deleted");
    onDeleted?.();
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="font-semibold">
        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
      </h3>
      <p className="text-sm text-gray-600">
        {job.contract} • {job.location}
      </p>
      <p className="mt-2 text-sm line-clamp-3">{job.description}</p>

      {/* فقط مالک شغل دکمه دیلیت را می‌بیند */}
      {sessionUserId === job.ownerId && (
        <button
          onClick={handleDelete}
          className="mt-2 bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
}
