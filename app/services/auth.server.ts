import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { invariant } from "@remix-run/router/history";
import { AppLoadContext } from "@remix-run/cloudflare";

type User = { name: string } | null;

export const authenticator = new Authenticator<User>(sessionStorage);

const verifyPassword = async (password: string, context?: AppLoadContext) => {
  console.log("Verifying password");
  if (!context?.cloudflare.env.BODORRIO_SECRET) return null;
  if (context?.cloudflare.env.BODORRIO_SECRET !== password) {
    return null;
  }
  return { name: "Auth user" };
};

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const password = form.get("password");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    const user = await verifyPassword(password, context);

    if (user) {
      return user;
    }
    throw new Error("Invalid password");
  }),
  "user-pass",
);
