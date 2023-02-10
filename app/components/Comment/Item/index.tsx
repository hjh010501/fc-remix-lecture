import { Box, Space, Text } from "@mantine/core";
import type { TComment } from '~/models/comment.service';

interface ICommentItem {
  comment: TComment
}

export default function CommentItem({ comment }: ICommentItem) {
  const createdAtDate = new Date(comment.created_at ?? "");

  return (
    <Box
      sx={{
        padding: "15px 0",
        borderBottom: "1px solid #eaeaea",
        userSelect: "element",
      }}
    >
      <Box>
        <Text>{comment.writer}</Text>
        <Text>{createdAtDate.toLocaleDateString()}{" "}
          {createdAtDate.toLocaleTimeString()}</Text>
        <Space h="md" />
        <Text>{comment.content}</Text>
      </Box>
    </Box>
  );
}
