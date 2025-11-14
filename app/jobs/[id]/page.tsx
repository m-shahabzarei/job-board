import prisma from "@/lib/prisma";

type Props = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function JobDetail({ params }: Props) {
  // unwrap کردن params
  const { id } = await params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return <div>Not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-sm text-gray-600">{job.contract} • {job.location}</p>
      <div className="mt-4">{job.description}</div>
    </div>
  );
}
