import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { getBoards } from "~/models/board.service";

export const loader: LoaderFunction = async ({ request, params }) => {
  const boards = await getBoards();
  console.log(boards);
  return { boards };
};

export default function Dynamic() {
  return (
    <div style={{ border: "3px solid red" }}>
      <h1>Dynamic</h1>
      <Link to="/dynamic/1" prefetch="intent">
        게시판 1
      </Link>{" "}
      <Link to="/dynamic/2" prefetch="render">
        게시판 2
      </Link>{" "}
      <Link to="/dynamic/3" prefetch="none">
        게시판 3
      </Link>
      <Outlet />
    </div>
  );
}
