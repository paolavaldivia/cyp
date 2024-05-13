import {
  json,
  type LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { repository } from "../../src/repository/repository";
import { authenticator } from "~/services/auth.server";

import styles from "~/styles/guests.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Attend</th>
            <th>Plus One</th>
            <th>Plus One Name</th>
            <th>Plus One Last Name</th>
            <th>Kids</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>
                <Link to={`/rsvp-edit/${guest.id}`}>{guest.id}</Link>
              </td>
              <td>{guest.name}</td>
              <td>{guest.lastName}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
              <td>{guest.attend ? "Yes" : "No"}</td>
              <td>{guest.plusOne ? "Yes" : "No"}</td>
              <td>{guest.plusOneName}</td>
              <td>{guest.plusOneLastName}</td>
              <td>{guest.kids}</td>
              <td>{guest.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
