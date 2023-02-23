import { Box, Title } from "@mantine/core";

export default function Header() {
    return (
        <Box sx={{ height: "50px", display: "flex", alignItems: 'center', borderBottom: "1px solid #eee" }}>
            <Title order={3}>Remix Community</Title>
        </Box>
    )
}