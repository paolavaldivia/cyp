import { FormPayload } from "~/models/formSchema";
import { Guest as PrismaGuest } from "@prisma/client";

export interface Guest {
  name: string;
  lastName: string;
  email?: string;
  phone: string;
  attend: boolean;
  plusOne: boolean;
  plusOneName?: string;
  plusOneLastName?: string;
  kids: number;
  comments?: string;
}

export const GuestFromFormData = (data: FormPayload): Guest => {
  return {
    name: data.first,
    lastName: data.last,
    email: data.email,
    phone: data.phone,
    attend: data.attend === "yes",
    plusOne: !!data.plusOne,
    plusOneName: data.plusOneName,
    plusOneLastName: data.plusOneLastName,
    kids: data.kids || 0,
    comments: data.comments,
  };
};

export const GuestFromPrismaData = (data: PrismaGuest): Guest => {
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
