import {
  json,
  type LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
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

export const action = async ({ request, context }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login?redirectTo=/guests",
  });
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  if (_action === "delete") {
    await repository.deleteGuest(values.id as string, context);
  }
  return null;
};

export default function Guest() {
  const { guests } = useLoaderData<typeof loader>();

  const totalGuests = guests.reduce((acc, guest) => {
    return acc + 1 + (guest.plusOne ? 1 : 0);
  }, 0);

  return (
    <div>
      <h1>Guests</h1>
      <table>
        <thead>
          <tr>
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
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
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
              <td>{1 + (guest.plusOne ? 1 : 0)}</td>
              <td>
                <div className="guests-td-content-actions">
                  <Link
                    className="button small tertiary"
                    to={`/rsvp-edit/${guest.id}`}
                  >
                    Edit
                  </Link>
                  <Form method={"post"}>
                    <input type="hidden" name="id" value={guest.id} />
                    <button
                      className="small secondary"
                      type="submit"
                      aria-label="delete"
                      name="_action"
                      value="delete"
                    >
                      X
                    </button>
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={10}>Total</td>
            <td>{totalGuests}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
