import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type {LinksFunction} from "@remix-run/cloudflare";

import resetStyles from "~/styles/reset.css?url";
import globalStyles from "~/styles/global.css?url";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: resetStyles }, { rel: "stylesheet", href: globalStyles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Sedan:ital@0;1&display=swap" rel="stylesheet"/>
        <Meta/>
        <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
    return <Outlet/>;
}
