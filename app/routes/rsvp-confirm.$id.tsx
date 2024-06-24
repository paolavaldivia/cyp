import { json, LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { invariant } from "@remix-run/router/history";
import { ClientOnly } from "remix-utils/client-only";

import styles from "~/styles/rsvp.css?url";
import rsvpPaletteStyles from "~/styles/rsvp-palette.css?url";
import { repository } from "../../src/repository/repository";
import { ColorPaletteClient } from "~/components/colorPalette.client";
import { paletteColors } from "../../src/utils/paletteColors";
import divider from "~/images/divider.svg";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: rsvpPaletteStyles },
];

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
      <div className="rsvp-content">
        <div className="rsvp-confirm-message">
          <p>¡Hola, {guest.name.trim()}!</p>
          {guest.attend ? (
            <>
              <p>Gracias por confirmar tu asistencia.</p>
            </>
          ) : (
            <p>
              ¡Qué lástima que no puedas asistir! Si cambias de opinión avísanos
              para que podamos hacer los ajustes necesarios.
            </p>
          )}
        </div>
        {guest.attend && (
          <>
            <img src={divider} alt="" height={15} />
            <div className="rsvp-confirm-message">
              <div>
                Recuerda que la boda se llevará a cabo el <b>24 de Agosto</b> en
                Arequipa. En el local de eventos "El Rosario".
                <a href="https://maps.app.goo.gl/nCiWZjMhtEhmhRHB6">
                  {" "}
                  🔗Google Maps
                </a>
              </div>
              <div>
                El código de vestimenta es formal (vestido, ternos, etc.). Si
                tienes alguna pregunta, no dudes en contactarnos.
              </div>
              <div>
                La recepción comenzará a las 2:00 p.m. y la ceremonia a las 3:00
                p.m.
              </div>
              <div>
                Para referencia, estos son los colores de la paleta de la boda:
                <ClientOnly fallback={<div />}>
                  {() => <ColorPaletteClient paletteColors={paletteColors} />}
                </ClientOnly>
              </div>
            </div>
          </>
        )}
        <img src={divider} alt="" height={15} />
        <Link className="button small" to={`/rsvp-edit/${id}`}>
          Editar RSVP
        </Link>
      </div>
    </div>
  );
}
