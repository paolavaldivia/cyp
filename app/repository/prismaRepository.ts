import { AppLoadContext } from "@remix-run/cloudflare";
import { GuestFromFormData } from "~/domain/guest";
import { getPrismaClient } from "../../db/client";
import { FormPayload } from "~/routes/formSchema";

export const rsvp = async (updates: FormPayload, context: AppLoadContext) => {
  const prisma = getPrismaClient(context);
  const record = await prisma.guest.create({
    data: GuestFromFormData(updates),
  });
  return {
    id: record.id,
  };
};

export const getGuest = async (id: string, context: AppLoadContext) => {
  const prisma = getPrismaClient(context);
  return prisma.guest.findUnique({
    where: {
      id,
    },
  });
};
