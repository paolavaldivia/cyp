import { FormPayload } from "../formSchema";
import { Prisma, PrismaClient } from "@prisma/client";

type GuestCreateBody = Prisma.Args<PrismaClient["guest"], "create">["data"];

export const PrismaGuestFromFormPayload = (
  data: FormPayload,
): GuestCreateBody => {
  return {
    name: data.first,
    lastName: data.last,
    email: data.email || null,
    phone: data.phone,
    attend: data.attend === "yes",
    dish: data.dish || null,
    plusOne: !!data.plusOne,
    plusOneName: data.plusOneName || null,
    plusOneLastName: data.plusOneLastName || null,
    plusOneDish: data.plusOneDish || null,
    kids: data.kids || 0,
    comments: data.comments || null,
  };
};
