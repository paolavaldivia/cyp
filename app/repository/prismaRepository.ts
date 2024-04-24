import { AppLoadContext } from "@remix-run/cloudflare";
import { GuestFromFormData, GuestFromPrismaData } from "~/domain/guest";
import { getPrismaClient } from "../../db/client";
import { FormPayload } from "~/models/formSchema";

export const rsvp = async (updates: FormPayload, context: AppLoadContext) => {
  const prisma = getPrismaClient(context);
  const record = await prisma.guest.create({
    data: GuestFromFormData(updates),
  });
  return {
    id: record.id,
  };
};

export const rsvpUpdate = async (
  id: string,
  updates: FormPayload,
  context: AppLoadContext,
) => {
  const prisma = getPrismaClient(context);
  const record = await prisma.guest.update({
    where: {
      id,
    },
    data: GuestFromFormData(updates),
  });
  return {
    id: record.id,
  };
};

export const getGuest = async (id: string, context: AppLoadContext) => {
  const prisma = getPrismaClient(context);
  const record = await prisma.guest.findUnique({
    where: {
      id,
    },
  });
  if (!record) {
    return null;
  }
  return GuestFromPrismaData(record);
};
