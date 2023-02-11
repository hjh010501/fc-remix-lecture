import { createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyles from "./global-styles.css";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "나만의 테크 블로그",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStyles },
];

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>
        <body>
          <NotificationsProvider>
            <Outlet />
          </NotificationsProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
