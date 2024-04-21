import { z } from "zod";

export const formSchema = z.object({
  first: z.string().min(1),
  last: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1),
  attend: z.enum(["yes", "no"]),
  plusOne: z.preprocess((value) => value === "on", z.boolean()).optional(),
  plusOneName: z.string().min(1).optional().or(z.literal("")),
  plusOneLastName: z.string().min(1).optional().or(z.literal("")),
  kids: z.coerce.number().int().min(0),
  comments: z.string().optional().or(z.literal("")),
});

export type FormPayload = z.infer<typeof formSchema>;
