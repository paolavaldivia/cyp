import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { isProduction } from "~/services/isProduction.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_bodorrio_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["3l_B0d0rr10_s3cr3t0"],
    secure: isProduction(),
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
