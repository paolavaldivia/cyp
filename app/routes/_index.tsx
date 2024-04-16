import type {LinksFunction, MetaFunction} from "@remix-run/cloudflare";

import styles from "~/styles/home.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
  return [
    {title: "Céline y Paola"},
    {
      name: "Céline y Paola se casan",
      content: "Bienvenidos a la boda de Céline y Paola",
    },

  ];
};

export default function Index() {
  return (
      <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
        <h1>Céline y Paola</h1>
      </div>
  );
}
