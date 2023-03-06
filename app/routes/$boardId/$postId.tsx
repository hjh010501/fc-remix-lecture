import {
  ActionIcon,
  Box,
  Divider,
  Menu,
  Modal,
  Space,
  Title,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import {
  IconChevronLeft,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Header from "~/components/Header";
import PostItem from "~/components/Post/Item";
import PostView from "~/components/Post/Viewer";
import SideBar from "~/components/SideBar";
import { getBoardByPath, getBoards } from "~/models/board.service";
import { getPostById, updateViewById } from "~/models/post.service";

interface ILoaderData {
  post: any;
}

export const loader: LoaderFunction = async ({ params }) => {
  const postId = parseInt(params.postId as string);
  const post = await getPostById(postId);
  await updateViewById(postId);
  return json<ILoaderData>({ post: post.data });
};

export default function BoardId() {
  const { post } = useLoaderData<ILoaderData>();
  const { boardId } = useParams();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to={`/${boardId}`}>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <Title>{post.title}</Title>
        </Box>

        <Menu shadow="md" width={200} position="left-start">
          <Menu.Target>
            <ActionIcon>
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Link to={`/posts/${post.id}/update`}>
              <Menu.Item icon={<IconPencil size={14} />}>글 수정하기</Menu.Item>
            </Link>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              글 삭제하기
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
      <Divider mt={20} mb={15} />
      <Box>
        <PostView content={post.content ?? "글이 없습니다."} />
      </Box>
      <Divider mt={20} mb="xs" />
    </Box>
  );
}
