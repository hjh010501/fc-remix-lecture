import { ActionIcon, Box, Button, Center, Divider, Menu, Modal, PasswordInput, Space, Text, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons";
import { IconChevronLeft } from "@tabler/icons-react";
import qs from "qs";
import { useEffect, useState } from "react";
import PostView from "~/components/Post/Viewer";
import { deletePost, getPost, TPost } from "~/models/post.service";

interface ILoaderData {
  post: TPost;
}

enum InputType {
  DELETE_POST = "0",
}

type InputData = {
  action: InputType;
  id?: number;
  password: string;
};

interface IActionData {
  message: TMessage;
};


export const loader: LoaderFunction = async ({ request, params }) => {
  const postId = params.postId as string;
  const getPostResponse = await getPost(parseInt(postId));
  console.log(getPostResponse)
  if (getPostResponse.data !== null) {
    return json<ILoaderData>({ post: getPostResponse.data })
  }

};

export const action: ActionFunction = async ({ request, params }) => {

  const data = qs.parse(await request.text()) as unknown as InputData;

  switch (data.action) {
    case InputType.DELETE_POST: {
      if (data.password !== process.env.ADMIN_PASSWORD) {
        return json<IActionData>({
          message: {
            title: "삭제 실패",
            message: "비밀번호가 일치하지 않습니다.",
            color: "red",
          }
        });
      }
      if (data.id) {
        const post = await deletePost(data.id);
        return redirect(`/`);
      }
    }
  }
  return json<IActionData>({
    message: {
      title: "처리 실패",
      message: "알 수 없는 오류가 발생했습니다.",
      color: "red",
    }
  });
};

export default function PostId() {

  const loaderData = useLoaderData<ILoaderData>();
  const actionData = useActionData<IActionData>();

  const [post, setPost] = useState(loaderData.post);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

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


  useEffect(() => {
    setPost(loaderData.post);
  }, [loaderData.post])

  return (
    <Box
      sx={{
        padding: "45px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <ActionIcon>
              <IconChevronLeft size={24} />
            </ActionIcon>
          </Link>
          <Space w="xs" />
          <Title>{post.title}</Title>
        </Box>
        <Menu shadow="md" width={200} position="left-start">
          <Menu.Target>
            <ActionIcon><IconDotsVertical /></ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconPencil size={14} />}>글 수정하기</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={() => {
              setDeleteModalOpened(true)
            }}>글 삭제하기</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Modal
          opened={deleteModalOpened}
          onClose={() => setDeleteModalOpened(false)}
          title="글 삭제"
        >
          <Text align="center">글을 삭제하기 위해서는 비밀번호를 입력해 주세요</Text>
          <Space h="lg" />
          <Form method="post">
            <input type="hidden" name="id" value={post.id} />
            <Center>
              <PasswordInput sx={{ minWidth: "200px" }} name="password" placeholder="관리자 비밀번호" />
            </Center>
            <Space h="lg" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
                취소
              </Button>
              <Space w="md" />
              <Button color="red" type="submit" name="action" value={InputType.DELETE_POST}>
                삭제
              </Button>
            </Box>
          </Form>
        </Modal>

      </Box>

      <Divider mt={20} mb={15} />
      <Box>
        <PostView content={post.content ?? "글이 없습니다."} />
      </Box>
    </Box>
  );
}
