import { AppLoadContext } from "@remix-run/cloudflare";
import { Guest, GuestWithId } from "../domain/guest";
import { getPrismaClient } from "../db/client";
import { FormPayload } from "../models/formSchema";
import { IGuestRepository } from "./IGuestRepository";
import {
  GuestFromPrisma,
  GuestWithIdFromPrisma,
} from "../models/mappers/guestFromPrisma";
import { PrismaGuestFromFormPayload } from "../models/mappers/prismaGuestFromFormPayload";

export class PrismaRepository implements IGuestRepository {
  constructor() {}

  async rsvp(
    updates: FormPayload,
    context: AppLoadContext,
  ): Promise<{ id: string }> {
    const prisma = getPrismaClient(context);
    const record = await prisma.guest.create({
      data: PrismaGuestFromFormPayload(updates),
    });
    return {
      id: record.id,
    };
  }

  async rsvpUpdate(
    id: string,
    updates: FormPayload,
    context: AppLoadContext,
  ): Promise<{ id: string }> {
    const prisma = getPrismaClient(context);
    const record = await prisma.guest.update({
      where: {
        id,
      },
      data: PrismaGuestFromFormPayload(updates),
    });
    return {
      id: record.id,
    };
  }

  async getGuest(id: string, context: AppLoadContext): Promise<Guest | null> {
    const prisma = getPrismaClient(context);
    const record = await prisma.guest.findUnique({
      where: {
        id,
      },
    });
    if (!record) {
      return null;
    }
    return GuestFromPrisma(record);
  }

  async getGuests(context: AppLoadContext): Promise<GuestWithId[]> {
    const prisma = getPrismaClient(context);
    const records = await prisma.guest.findMany({
      where: {
        deletedAt: null,
      },
    });
    return records.map(GuestWithIdFromPrisma);
  }

  async deleteGuest(id: string, context: AppLoadContext): Promise<void> {
    const prisma = getPrismaClient(context);
    await prisma.guest.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
