import {
  ActionIcon,
  Box,
  Button,
  Divider,
  PasswordInput,
  Space,
  TextInput,
  Title
} from "@mantine/core";
import { Form, Link, useActionData } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";

import { ActionFunction, json, redirect } from "@remix-run/node";

import { showNotification } from "@mantine/notifications";
import qs from "qs";
import { useEffect, useState } from "react";
import PostUpload from "~/components/Post/Upload";
import { createPost } from "~/models/post.service";

interface InputData {
  title: string;
  content: string;
  password: string;
}
interface IActionData {
  message: TMessage;
}


export const action: ActionFunction = async ({ request, params }) => {

  const data = qs.parse(await request.text()) as unknown as InputData;

  if (!data.password || data.password !== process.env.ADMIN_PASSWORD) {
    return json<IActionData>({
      message: {
        title: "업로드 실패",
        message: "패스워드가 일치하지 않습니다.",
        color: "red",
      }
    });
  }

  if (data.title && data.content) {
    const post = await createPost(
      data.title,
      data.content,
    )
    return redirect(`/`)
  }
  return json<IActionData>({
    message: {
      title: "업로드 실패",
      message: "제목과 내용을 모두 입력해주세요.",
      color: "red",
    }
  });
};

export default function PostCreate() {

  const actionData = useActionData<IActionData>();
  const [message, setMessage] = useState<IActionData>();

  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
      showNotification({
        title: actionData.message.title,
        message: actionData.message.message,
        color: actionData.message.color,
      })
    }

  }, [actionData])


  return (
    <Box
      sx={{
        padding: "45px",
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
        <TextInput placeholder="제목" variant="filled" size="xl" name="title" />
        <Space h="xl" />
        <PostUpload />
        <Space h="xl" />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <PasswordInput sx={{ minWidth: "200px" }} name="password" placeholder="관리자 비밀번호" />
          <Space w="xs" />
          <Button color="red" type="submit">작성하기</Button>
        </Box>
      </Form>
    </Box>
  );
}
