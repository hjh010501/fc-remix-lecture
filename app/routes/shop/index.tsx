import { Box } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import Header from "~/components/Header";
import SideBar from "~/components/SideBar";
import { getBoardByPath, getBoards } from "~/models/board.service";
import { getPostByBoardId } from "~/models/post.service";

export default function Shop() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      adad
    </Box>
  );
}
