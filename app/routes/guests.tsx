import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { repository } from "../../src/repository/repository";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login?redirectTo=/guests",
  });
  const guests = await repository.getGuests(context);
  return json({ guests });
};

export default function Guest() {
  const { guests } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Guest</h1>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.name} {guest.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
