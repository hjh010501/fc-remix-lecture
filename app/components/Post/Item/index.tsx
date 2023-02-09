import { Box, Title, Text, Space } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { TPost } from "~/models/post.service";

interface IPostItem {
  post: TPost;
}

export default function PostItem({ post }: IPostItem) {
  return (
    <Box
      sx={{
        padding: "15px 0",
        borderBottom: "1px solid #eaeaea",
        userSelect: "element",
      }}
    >
      <Link to={`/posts/${post.id}`}>
        <Title order={3}>{post.title}</Title>
      </Link>
      <Space h="xs" />
      <Link to={`/posts/${post.id}`}>
        <Text>{post.content}</Text>
      </Link>
      <Space h="xs" />
      <Box sx={{ display: "flex" }}>
        <Text size="xs" color="gray">
          댓글 {post.commentCount}개
        </Text>
        <Space w="xs" />
        <Text size="xs" color="gray">
          {post.createAt.toLocaleDateString()}{" "}
          {post.createAt.toLocaleTimeString()}
        </Text>
      </Box>
    </Box>
  );
}
