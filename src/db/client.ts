import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { AppLoadContext } from "@remix-run/cloudflare";

export const connection = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  const prisma = new PrismaClient({ adapter });
  return prisma;
};

export const getPrismaClient = (context: AppLoadContext) =>
  context.prismaClient;
