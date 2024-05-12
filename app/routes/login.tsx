import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  LinksFunction,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import styles from "~/styles/login.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  return await authenticator.isAuthenticated(request, {
    successRedirect: redirectTo,
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
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: redirectTo,
    failureRedirect: "/login",
    context,
  });
}
