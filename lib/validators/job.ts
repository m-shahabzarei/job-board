
// lib/validators/job.ts
import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات کوتاه است"),
  contract: z.enum(["Full-time", "Part-time", "Contract"]),
  location: z.string().min(2, "محل کار باید حداقل ۲ کاراکتر باشد"),
  salary: z.string().optional(),
  ownerEmail: z.string().email(), // اضافه شد برای server action
});

export type JobInput = z.infer<typeof jobSchema>;


// import { z } from "zod";

// export const jobSchema = z.object({
//   title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
//   description: z.string().min(10, "توضیحات کوتاه است"),
//   contract: z.enum(["Full-time", "Part-time", "Contract"]),
//   location: z.string().min(2),
//   salary: z.string().optional(),
// });

// export type JobInput = z.infer<typeof jobSchema>;
