// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/nextAuth";
// import prisma from "@/lib/prisma";
// import JobCard from "@/components/JobCard";
// import JobForm from "@/components/JobForm";
// import Link from "next/link";

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions as any);
//   if (!session || !session.user) {
//     return (
//       <div>
//         برای دیدن داشبورد ابتدا وارد شوید.{" "}
//         <Link href="/api/auth/signin" className="text-blue-600">
//           ورود
//         </Link>
//       </div>
//     );
//   }

//   const jobs = await prisma.job.findMany({
//     where: { owner: { email: session.user.email } },
//     orderBy: { postedAt: "desc" },
//   });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">داشبورد شما</h1>

//       <div className="mt-6 mb-6">
//         <h2 className="font-semibold">ایجاد شغل جدید</h2>
//         <JobForm
//           ownerEmail={session.user.email}
//           onSaved={() => window.location.reload()}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {jobs.map((job: any) => (
//           <JobCard key={job.id} job={job} />
//         ))}
//       </div>
//     </div>
//   );
// }


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import prisma from "@/lib/prisma";
import JobForm from "@/components/JobForm";
import JobCard from "@/components/JobCard";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div>
        برای دیدن داشبورد ابتدا وارد شوید.{" "}
        <Link href="/api/auth/signin" className="text-blue-600">
          ورود
        </Link>
      </div>
    );
  }

  const jobs = await prisma.job.findMany({
    where: {
      owner: {
        email: session.user.email!,
      },
    },
    orderBy: { postedAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-xl font-bold">داشبورد</h1>

      <div className="mt-6 mb-6">
        <h2 className="font-semibold">ایجاد شغل جدید</h2>
        <JobForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
