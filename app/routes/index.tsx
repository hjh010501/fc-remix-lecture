import { Box, Title } from "@mantine/core";
import List from "~/components/List";
import PostItem from "../components/Post/Item/index";

export default function Index() {
  return (
    <Box
      sx={{
        padding: "45px",
      }}
    >
      <Title>나만의 테크 블로그</Title>
      <List>
        <PostItem></PostItem>
      </List>
    </Box>
  );
}
