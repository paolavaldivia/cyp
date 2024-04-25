import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { invariant } from "@remix-run/router/history";

import styles from "~/styles/rsvp.css?url";
import { repository } from "~/repository/repository";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ params, context }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing guest id param");
  const guest = await repository.getGuest(params.id, context);
  if (!guest) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ guest });
};

export default function RsvpConfirm() {
  const { guest } = useLoaderData<typeof loader>();
  const { id } = useParams();

  return (
    <div className="rsvp-container">
      <div className="rsvp-content rsvp-confirm-message">
        <p>¡Hola, {guest.name.trim()}!</p>
        {guest.attend ? (
          <p>Gracias por confirmar tu asistencia.</p>
        ) : (
          <p>
            ¡Qué lástima que no puedas asistir! Si cambias de opinión avísanos
            para que podamos hacer los ajustes necesarios.
          </p>
        )}
        <Link className="button small" to={`/rsvp-edit/${id}`}>
          Editar RSVP
        </Link>
      </div>
    </div>
  );
}
