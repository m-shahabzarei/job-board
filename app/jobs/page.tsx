/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSearchStore } from "@/store/useSearchStore";
import { useJobs } from "@/lib/hooks/useJobs";
import JobCard from "@/components/JobCard";

export default function JobsPageClient() {
  const q = useSearchStore((s) => s.q);
  const contract = useSearchStore((s) => s.contract);
  const city = useSearchStore((s) => s.city);
  const setQ = useSearchStore((s) => s.setQ);
  const setContract = useSearchStore((s) => s.setContract);
  const setCity = useSearchStore((s) => s.setCity);

  const { jobs, loading } = useJobs({ q, contract, city });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      <div className="mb-4 flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="border p-2 rounded" />
        <select value={contract ?? ""} onChange={(e) => setContract(e.target.value || null)} className="border p-2 rounded">
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="border p-2 rounded" />
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job: any) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
