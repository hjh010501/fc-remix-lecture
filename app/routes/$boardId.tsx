import { Box, Space, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import Header from "~/components/Header";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/SideBar";
import { getBoardByPath, getBoards } from "~/models/board.service";
import { getPostByBoardId } from "~/models/post.service";

interface ILoaderData {
  boards: any;
  posts?: any;
}

export const loader: LoaderFunction = async ({ params }) => {
  const path = params.boardId as string;
  const boards = await getBoards();

  if (path) {
    const selectedBoard = await getBoardByPath(path);
    if (!selectedBoard.data) return json<ILoaderData>({ boards: boards.data });

    const posts = await getPostByBoardId(selectedBoard.data.id as number);
    return json<ILoaderData>({ boards: boards.data, posts: posts.data });
  }

  return json<ILoaderData>({ boards: boards.data });
};

export default function BoardId() {
  const { boards, posts } = useLoaderData<ILoaderData>();
  const { boardId } = useParams();
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
      <SideBar boards={boards} />
      <Space w="xl" />
      <Box sx={{ width: "100%" }}>
        <Outlet />
        {posts && posts.length > 0 ? (
          posts.map((post: any, i: number) => (
            <PostItem post={post} path={boardId as string} key={i} />
          ))
        ) : (
          <>
            <Title order={3}>글이 없습니다</Title>
          </>
        )}
      </Box>
    </Box>
  );
}
