import { Guest } from "../../domain/guest";
import { Guest as PrismaGuest } from "@prisma/client";

export const GuestFromPrisma = (data: PrismaGuest): Guest => {
  return {
    name: data.name,
    lastName: data.lastName,
    email: data.email || undefined,
    phone: data.phone,
    attend: data.attend,
    plusOne: data.plusOne,
    plusOneName: data.plusOneName || undefined,
    plusOneLastName: data.plusOneLastName || undefined,
    kids: data.kids,
    comments: data.comments || undefined,
  };
};
