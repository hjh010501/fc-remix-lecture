import { Box, Divider, Title } from "@mantine/core";

export default function PostId() {
  return (
    <Box
      sx={{
        padding: "45px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title>첫번째 포스트</Title>
      </Box>
      <Divider mt={20} mb={15} />
      <Box></Box>
    </Box>
  );
}
