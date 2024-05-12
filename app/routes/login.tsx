import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { LinksFunction } from "@remix-run/cloudflare";
import styles from "~/styles/login.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

export default function Login() {
  return (
    <div className="form-container">
      <Form method="post" className="login-form">
        <label>
          Super secreto:
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button>Sign In</button>
      </Form>
    </div>
  );
}

export async function action({ request, context }: ActionFunctionArgs) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
    context,
  });
}
