import { Box, Space, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PostItem from "~/components/Post/Item";
import SideBar from "~/components/SideBar";
import { getBoards } from "~/models/board.service";
import { getPosts } from "~/models/post.service";

interface ILoaderData {
  boards: any;
  posts: any;
}

export const loader: LoaderFunction = async ({ request }) => {
  const boards = await getBoards();
  const recentPost = await getPosts();
  return json<ILoaderData>({ boards: boards.data, posts: recentPost.data });
};

export default function Index() {
  const { boards, posts } = useLoaderData<ILoaderData>();
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
        <Title order={3}>최근 글</Title>
        <Space h="md" />
        {posts
          ? posts.map((post: any, i: number) => (
              <PostItem post={post} path={post.board.path} key={i} />
            ))
          : null}
      </Box>
    </Box>
  );
}
