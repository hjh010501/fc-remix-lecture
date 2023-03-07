import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Menu,
  Modal,
  Space,
  Title,
  Text,
} from "@mantine/core";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useFetcher,
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
import qs from "qs";
import { useState } from "react";
import { authenticate, getUserToken } from "~/auth.server";
import Header from "~/components/Header";
import PostItem from "~/components/Post/Item";
import PostView from "~/components/Post/Viewer";
import SideBar from "~/components/SideBar";
import { getBoardByPath, getBoards } from "~/models/board.service";
import { deletePost, getPostById, updateViewById } from "~/models/post.service";
import supabase from "~/models/supabase";
import type { IActionData } from "../$boardId";

interface ILoaderData {
  is_login: boolean;
  user?: User | null;
  post: any;
}

export enum InputType {
  DELETE_POST = "0",
  CREATE_COMMENT = "1",
  UPDATE_COMMENT = "2",
  DELETE_COMMENT = "3",
}

type InputData = {
  action: InputType;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const post = await getPostById(postId);
  await updateViewById(postId);

  const { accessToken } = await getUserToken(request);

  if (!accessToken)
    return json<ILoaderData>({ is_login: false, post: post.data });

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  return json<ILoaderData>({ is_login: true, user, post: post.data });
};

export const action: ActionFunction = async ({ request, params }) => {
  const boardId = params.boardId as string;
  const postId = parseInt(params.postId as string);
  const data = qs.parse(await request.text()) as unknown as InputData;

  const { accessToken } = await authenticate(request);

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  const post = await getPostById(postId);

  switch (data.action) {
    case InputType.DELETE_POST: {
      if (user && user.id === post.data.writer.user_id) {
        const post = await deletePost(postId);
        return redirect(`/${boardId}`);
      } else {
        return json<IActionData>({
          message: {
            title: "삭제 실패",
            message: "권한이 없습니다.",
            color: "red",
          },
        });
      }
    }
  }
};

export default function PostId() {
  const { post, is_login, user } = useLoaderData<ILoaderData>();
  const fetcher = useFetcher();
  const { boardId } = useParams();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

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

        {is_login && user.id === post.writer.user_id && (
          <>
            <Menu shadow="md" width={200} position="left-start">
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Link to={`/${boardId}/${post.id}/update`}>
                  <Menu.Item icon={<IconPencil size={14} />}>
                    글 수정하기
                  </Menu.Item>
                </Link>
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => {
                    setDeleteModalOpened(true);
                  }}
                >
                  글 삭제하기
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Modal
              opened={deleteModalOpened}
              onClose={() => setDeleteModalOpened(false)}
              title="글 삭제"
            >
              <Text align="center">정말 글을 삭제하시겠습니까?</Text>
              <Space h="lg" />
              <Space h="lg" />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="default"
                  onClick={() => setDeleteModalOpened(false)}
                >
                  취소
                </Button>
                <Space w="md" />
                <fetcher.Form method="post">
                  <Button
                    color="red"
                    type="submit"
                    name="action"
                    value={InputType.DELETE_POST}
                  >
                    삭제
                  </Button>
                </fetcher.Form>
              </Box>
            </Modal>
          </>
        )}
      </Box>
      <Divider mt={20} mb={15} />
      <Box>
        <PostView content={post.content ?? "글이 없습니다."} />
      </Box>
      <Divider mt={20} mb="xs" />
    </Box>
  );
}
