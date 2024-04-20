import {AppLoadContext} from "@remix-run/cloudflare";
import {GuestFromFormData} from "~/domain/guest";
import {getPrismaClient} from "../../db/client";

export const rsvp = async (updates:  {[p: string]: FormDataEntryValue}, context: AppLoadContext) => {
    const prisma = getPrismaClient(context);
    const record = await prisma.guest.create({
        data: GuestFromFormData(updates),
    })
    return {
        id: record.id,
    };
}

export const getGuest = async (id: string, context: AppLoadContext) => {
    const prisma = getPrismaClient(context);
    return prisma.guest.findUnique({
        where: {
            id,
        }
    });
}