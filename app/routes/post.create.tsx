import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { showNotification } from "@mantine/notifications";
import qs from "qs";
import { useEffect, useState } from "react";
import PostUpload from "~/components/Post/Upload";
import { createPost } from "~/models/post.service";
import type { TBoard } from "~/models/board.service";
import { getBoards } from "~/models/board.service";
import { authenticate, getUser } from "~/auth.server";

interface ILoaderData {
  boards: TBoard[];
}

interface InputData {
  title: string;
  content: string;
  board_id: number;
  writer: string;
}

interface IActionData {
  message: TMessage;
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticate(request);
  const boards = await getBoards();
  return json<ILoaderData>({ boards: boards.data as TBoard[] });
};

export const action: ActionFunction = async ({ request, params }) => {
  const { headers } = await authenticate(request);
  const user = await getUser(request);
  const data = qs.parse(await request.text()) as unknown as InputData;

  if (data.board_id && data.title && data.content) {
    const post = await createPost(
      data.title,
      data.content,
      data.board_id,
      user.user.id
    );
    console.log(post);
    return redirect(`/`, {
      headers,
    });
  }

  return json<IActionData>({
    message: {
      title: "글 작성 실패",
      message: "제목과 내용을 모두 입력해주세요.",
      color: "red",
    },
  });
};

export default function PostCreate() {
  const { boards } = useLoaderData<ILoaderData>();
  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<IActionData>();

  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (message) {
      showNotification({
        title: message.message.title,
        message: message.message.message,
        color: message.message.color,
      });
    }
  }, [message]);

  return (
    <Box
      sx={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="/">
          <ActionIcon>
            <IconChevronLeft size={24} />
          </ActionIcon>
        </Link>
        <Space w="xs" />
        <Title>글 작성</Title>
      </Box>
      <Divider mt={20} mb={20} />
      <Form method="post">
        <Box sx={{ display: "flex" }}>
          <Select
            name="board_id"
            size="xl"
            placeholder="게시판"
            data={boards.map((board) => ({
              value: board.id.toString(),
              label: board.name,
            }))}
          />
          <Space w="md" />
          <TextInput
            sx={{ width: "100%" }}
            placeholder="제목"
            variant="filled"
            size="xl"
            name="title"
          />
        </Box>
        <Space h="xl" />
        <PostUpload />
        <Space h="xl" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit">작성하기</Button>
        </Box>
      </Form>
    </Box>
  );
}
