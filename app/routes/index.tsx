import { Box, Button, Divider, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import List from "~/components/List";
import PostItem from "../components/Post/Item/index";

const dummyPost = [
  {
    id: 1,
    title: "첫번째 포스트",
    content:
      "첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용 첫번째 포스트 내용",
    createAt: new Date(2023, 2, 9),
    commentCount: 2,
  },
  {
    id: 2,
    title: "두번째 포스트",
    content: "두번째 포스트 내용",
    createAt: new Date(2023, 2, 7),
    commentCount: 3,
  },
  {
    id: 3,
    title: "세번째 포스트",
    content: "세번째 포스트 내용",
    createAt: new Date(2023, 2, 5),
    commentCount: 5,
  },
];
export default function Index() {
  return (
    <Box
      sx={{
        padding: "45px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title>🍾 나만의 테크 블로그</Title>
        <Link to="/posts/create">
          <Button variant="light" color="red">
            글쓰기
          </Button>
        </Link>
      </Box>
      <Divider mt={20} mb={15} />
      <List>
        {dummyPost.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </List>
    </Box>
  );
}
