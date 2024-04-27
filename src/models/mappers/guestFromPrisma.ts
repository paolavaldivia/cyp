import { Guest } from "../../domain/guest";
import { Guest as PrismaGuest } from "@prisma/client";

export const GuestFromPrisma = (data: PrismaGuest): Guest => {
  return {
    name: data.name,
    lastName: data.lastName,
    email: data.email || undefined,
    phone: data.phone,
    attend: data.attend,
    dish: data.dish || undefined,
    plusOne: data.plusOne,
    plusOneName: data.plusOneName || undefined,
    plusOneLastName: data.plusOneLastName || undefined,
    plusOneDish: data.plusOneDish || undefined,
    kids: data.kids,
    comments: data.comments || undefined,
  };
};
