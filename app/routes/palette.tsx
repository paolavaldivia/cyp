import styles from "~/styles/palette.css?url";
import { LinksFunction } from "@remix-run/cloudflare";
import { ColorPaletteClient } from "~/components/colorPalette.client";
import { ClientOnly } from "remix-utils/client-only";
import { paletteColorsAll } from "../../src/utils/paletteColors";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Palette() {
  return (
    <div className="container">
      <h1>Palette</h1>
      <ClientOnly fallback={<div />}>
        {() => <ColorPaletteClient paletteColors={paletteColorsAll} />}
      </ClientOnly>
    </div>
  );
}
