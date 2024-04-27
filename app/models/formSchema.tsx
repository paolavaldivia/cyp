import { z } from "zod";

export const dishOptions = ["pescado", "lomo"] as const;
export type Dish = (typeof dishOptions)[number];

export const formSchema = z
  .object({
    first: z.string().min(1),
    last: z.string().min(1),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().min(1),
    attend: z.enum(["yes", "no"]),
    dish: z.enum(dishOptions).optional().or(z.literal("")),
    plusOne: z.preprocess((value) => value === "on", z.boolean()).optional(),
    plusOneName: z.string().min(1).optional().or(z.literal("")),
    plusOneLastName: z.string().min(1).optional().or(z.literal("")),
    plusOneDish: z.enum(dishOptions).optional().or(z.literal("")),
    kids: z.coerce.number().int().min(0),
    comments: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      return !(data.attend === "yes" && data.dish === "");
    },
    {
      message: "Por favor selecciona un plato.",
      path: ["dish"], // This error message will be associated with the dish field
    },
  )
  .refine(
    (data) => {
      return !(data.plusOne && data.plusOneDish === "");
    },
    {
      message: "Por favor selecciona un plato para tu acompañante.",
      path: ["plusOneDish"], // This error message will be associated with the plusOneDish field
    },
  );

export type FormPayload = z.infer<typeof formSchema>;
