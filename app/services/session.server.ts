import { createCookieSessionStorage } from "@remix-run/cloudflare";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_bodorrio_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["3l_B0d0rr10_s3cr3t0"],
    secure: process.env.NODE_ENV === "production",
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
