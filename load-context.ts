import { type PlatformProxy } from "wrangler";
// import {connection} from "./db/client";
// import {AppLoadContext} from "@remix-run/cloudflare";


type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    // db: Awaited<ReturnType<typeof connection>>
  }
}

// type GetLoadContext = (args: {
//   request: Request
//   context: {
//     cloudflare: Cloudflare
//   } // load context _before_ augmentation
// }) => Promise<AppLoadContext>
//
// export const getLoadContext: GetLoadContext = async ({ context }) => {
//   return {
//     ...context,
//     db: await connection(
//         context.cloudflare.env.DB,
//     ),
//   }
// }