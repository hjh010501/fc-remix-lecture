import { Box, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import globalStyles from "~/styles/global.css";
import { getUserToken } from "./auth.server";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { getBoards } from "./models/board.service";
import supabase from "./models/supabase";

export interface IRootLoaderData {
  is_login: boolean;
  user?: User | null;
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Community",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken } = await getUserToken(request);

  if (!accessToken) return json<IRootLoaderData>({ is_login: false });

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  return json<IRootLoaderData>({ is_login: true, user });
};

export default function App() {
  const { is_login, user } = useLoaderData<IRootLoaderData>();
  const location = useLocation();

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
            {!location.pathname.includes("/auth") && (
              <Header is_login={is_login} user={user} />
            )}

            <Outlet context={{ user, is_login }} />
          </NotificationsProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
