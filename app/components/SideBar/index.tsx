import { Box, Title, Text, Space } from "@mantine/core";
import { Link, useLocation } from "@remix-run/react";
import type { TBoard } from "../../models/board.service";

export default function SideBar({ boards }: { boards: TBoard[] }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <Box
      sx={{
        minWidth: "250px",
        height: "fit-content",
        padding: "25px",
        borderRadius: "25px",
        backgroundColor: "#f6f6f6",
      }}
    >
      <Title order={4}>게시판</Title>
      <Space h="xs" />
      {boards.map((board, i: number) => (
        <Link to={`/${board.path}`} prefetch="intent" key={i}>
          <Text
            mt={3}
            sx={{
              color: path === board.path ? "black" : "gray",
              "&:hover": {
                color: "black",
              },
            }}
          >
            {board.name}
          </Text>
        </Link>
      ))}
    </Box>
  );
}
