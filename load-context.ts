import { type PlatformProxy } from "wrangler";
import { AppLoadContext } from "@remix-run/cloudflare";
import { connection } from "./src/db/client";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    prismaClient: ReturnType<typeof connection>;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const prismaClient = connection(context.cloudflare.env.DB);
  return {
    ...context,
    prismaClient,
  };
};
