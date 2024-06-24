import { json, LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { ClientOnly } from "remix-utils/client-only";

import styles from "~/styles/home.css?url";
import divider from "~/images/divider.svg";
import { MainPhoto } from "~/components/mainPhoto";
import { useLoaderData } from "@remix-run/react";
import { TitleClient } from "~/components/title.client";
import { ColorPaletteClient } from "~/components/colorPalette.client";
import { paletteColors } from "../../src/utils/paletteColors";

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

export const loader = async () => {
  const n = 8;
  const imagePaths = Array.from(
    { length: n },
    (_, i) => `/images/photos/cyp_${i}.jpg`,
  );
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const selectedImage = imagePaths[randomIndex];
  return json({ selectedImage });
};

export default function Index() {
  const { selectedImage } = useLoaderData<typeof loader>();
  return (
    <div className="container">
      <div className="home-main">
        <MainPhoto selectedImage={selectedImage} />
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
              en "El Rosario Salón de Eventos".
            </p>
            <p>Únete a nosotros para celebrar este día tan especial.</p>
          </div>
          <img src={divider} alt="" height={20} />
          <div className="home-main-extra">
            <div>
              <div className="home-main-extra-title">Dirección:</div>
              Sector Bajo Cural lote 425 Lateral 7 - 3, Uchumayo.
              <br />
              <a
                href="https://maps.app.goo.gl/nCiWZjMhtEhmhRHB6"
                rel="noopener noreferrer"
                target="_blank"
              >
                🔗 Google Maps
              </a>
            </div>
            <div>
              <div className="home-main-extra-title">Paleta de la boda:</div>
              <ClientOnly fallback={<div />}>
                {() => <ColorPaletteClient paletteColors={paletteColors} />}
              </ClientOnly>
            </div>
          </div>
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
