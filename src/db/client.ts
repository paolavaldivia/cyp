import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { AppLoadContext } from "@remix-run/cloudflare";

export const connection = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
};

export const getPrismaClient = (context: AppLoadContext) =>
  context.prismaClient;
