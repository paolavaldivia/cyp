import styles from "~/styles/palette.css?url";
import { LinksFunction } from "@remix-run/cloudflare";
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Palette() {
  return (
    <div className="container">
      <h1>Palette</h1>
      <div className="palette">
        <div
          className="color"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-primary-variant-1)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-primary-variant-2)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-secondary)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-secondary-variant-1)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-secondary-variant-2)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-tertiary)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-tertiary-variant-1)" }}
        ></div>
        <div
          className="color"
          style={{ backgroundColor: "var(--color-tertiary-variant-2)" }}
        ></div>
      </div>
    </div>
  );
}
