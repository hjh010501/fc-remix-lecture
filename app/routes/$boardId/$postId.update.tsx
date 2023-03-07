import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Menu,
  Modal,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
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
import qs from "qs";
import { authenticate } from "~/auth.server";
import Header from "~/components/Header";
import PostItem from "~/components/Post/Item";
import PostUpload from "~/components/Post/Upload";
import PostView from "~/components/Post/Viewer";
import SideBar from "~/components/SideBar";
import { getBoardByPath, getBoards } from "~/models/board.service";
import { getPostById, updatePost, updateViewById } from "~/models/post.service";
import supabase from "~/models/supabase";

interface ILoaderData {
  post: any;
}

interface InputData {
  id: string;
  title: string;
  content: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const post = await getPostById(postId);

  const { accessToken } = await authenticate(request);

  if (!accessToken) return redirect("/auth/sign-in");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (user && user.id !== post.data.writer.user_id)
    return redirect("/auth/sign-in");

  return json<ILoaderData>({ post: post.data });
};

export const action: ActionFunction = async ({ request, params }) => {
  const postId = parseInt(params.postId as string);
  const boardId = params.boardId as string;

  const data = qs.parse(await request.text()) as unknown as InputData;
  const post = await getPostById(postId);

  const { accessToken } = await authenticate(request);

  if (!accessToken) return redirect("/auth/sign-in");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  if (user && user.id !== post.data.writer.user_id)
    return redirect("/auth/sign-in");

  await updatePost(postId, data.title, data.content);

  return redirect(`/${boardId}/${postId}`);
};

export default function PostIdUpdate() {
  const { post } = useLoaderData<ILoaderData>();
  const { boardId, postId } = useParams();
  return (
    <Box>
      <Form method="post">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/${boardId}/${postId}`}>
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <TextInput
            sx={{ width: "100%" }}
            placeholder="제목"
            variant="filled"
            size="xl"
            name="title"
            defaultValue={post.title}
          />
        </Box>
        <Divider mt={20} mb={15} />
        <Box>
          <PostUpload defaultValue={post.content} />
        </Box>
        <Space h="xl" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">수정하기</Button>
        </Box>
        <Divider mt={20} mb="xs" />
      </Form>
    </Box>
  );
}
