/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { jobSchema } from "@/lib/validators/job";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// export default function JobForm({ ownerEmail, onSaved }: { ownerEmail: string; onSaved?: () => void }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(jobSchema as any),
//     defaultValues: { contract: "Full-time" },
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       await axios.post("/api/jobs", { ...data, ownerEmail });
//       toast.success("Job created");
//       onSaved?.();
//     } catch (err) {
//       toast.error("Error creating job");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//       <div>
//         <label>Title</label>
//         <input {...register("title")} className="w-full border p-2 rounded" />
//         {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//       </div>

//       <div>
//         <label>Description</label>
//         <textarea {...register("description")} className="w-full border p-2 rounded" rows={5} />
//         {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//       </div>

//       <div className="grid grid-cols-3 gap-3">
//         <select {...register("contract")} className="border p-2 rounded">
//           <option value="Full-time">Full-time</option>
//           <option value="Part-time">Part-time</option>
//           <option value="Contract">Contract</option>
//         </select>
//         <input {...register("location")} placeholder="City" className="border p-2 rounded" />
//         <input {...register("salary")} placeholder="Salary" className="border p-2 rounded" />
//       </div>

//       <div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/lib/validators/job";
import { toast } from "react-hot-toast";

export default function JobForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { contract: "Full-time" },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error?.formErrors?.fieldErrors?.title?.[0] || "Error creating job");
        return;
      }

      toast.success("Job created");
      reset();
    } catch (err) {
      toast.error("Error creating job");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label>Title</label>
        <input {...register("title")} className="w-full border p-2 rounded" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} rows={5} className="w-full border p-2 rounded" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <select {...register("contract")} className="border p-2 rounded">
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <input {...register("location")} placeholder="City" className="border p-2 rounded" />
        <input {...register("salary")} placeholder="Salary" className="border p-2 rounded" />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
}
