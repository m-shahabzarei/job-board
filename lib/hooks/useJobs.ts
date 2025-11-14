/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useJobs(params?: { q?: string; contract?: string | null; city?: string }) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await axios.get("/api/jobs", { params });
      setJobs(res.data.items || []);
      setLoading(false);
    };
    fetcher();
  }, [params?.q, params?.contract, params?.city]);
  return { jobs, loading };
}
