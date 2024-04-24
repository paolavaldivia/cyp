import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { ClientOnly } from "remix-utils/client-only";

import styles from "~/styles/home.css?url";
import divider from "~/images/divider.svg";
import { MainPhoto } from "~/components/mainPhoto";
import { Link } from "@remix-run/react";
import { TitleClient } from "~/components/title.client";

const n = 8;
const imagePaths = Array.from(
  { length: n },
  (_, i) => `/images/photos/cyp_${i}.jpg`,
);

export type IndexData = {
  selectedImage: string;
};

export const loader: LoaderFunction = (): IndexData => {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const selectedImage = imagePaths[randomIndex];
  return { selectedImage };
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "Céline y Paola" },
    {
      name: "Céline y Paola se casan",
      content: "Bienvenidos a la boda de Céline y Paola",
    },
  ];
};

export default function Index() {
  return (
    <div className="container">
      <div className="home-main">
        <MainPhoto />
        <ClientOnly fallback={<h1>Céline y Paola</h1>}>
          {() => <TitleClient />}
        </ClientOnly>
        <img src={divider} alt="" height={20} />
        <div className="home-main-content">
          <div className="home-main-description">
            <p>
              ¡Bienvenidos a nuestra boda! <br /> Estamos muy emocionadas de
              compartir este día con ustedes.
            </p>
            <p>
              La ceremonia se llevará a cabo el <b> 24 de Agosto</b> en Arequipa
              (dirección exacta a ser confirmada).
            </p>
            <p>Únete a nosotros para celebrar este día tan especial.</p>
          </div>
          <img src={divider} alt="" height={20} />
          <Link className="button" to="/rsvp">
            RSVP
          </Link>
          <p> antes del 2 de junio</p>
        </div>
      </div>
      {/*<CardRound orientation="left" className="home-story">*/}
      {/*    Nuestra historia*/}
      {/*</CardRound>*/}
      {/*<CardRound orientation="right" className="home-faq">*/}
      {/*    Información*/}
      {/*</CardRound>*/}
    </div>
  );
}
