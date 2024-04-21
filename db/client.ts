import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { AppLoadContext } from "@remix-run/cloudflare";

let prisma: PrismaClient | undefined;

export const getPrismaClient = (context: AppLoadContext) => {
  if (!prisma) {
    const adapter = new PrismaD1(context.cloudflare.env.DB);
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
};
