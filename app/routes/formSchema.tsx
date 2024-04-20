import {z} from "zod";

export const formSchema = z.object(
    {
        first: z.string().min(1),
        last: z.string().min(1),
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().min(1),
        attend: z.enum(["yes", "no"]),
    }
)

export type FormPayload = z.infer<typeof formSchema>;
