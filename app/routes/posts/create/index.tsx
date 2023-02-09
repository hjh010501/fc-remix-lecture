import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "@remix-run/react";
import { IconChevronLeft } from "@tabler/icons-react";

import { RichTextEditor, Link as RTELink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";

export default function PostCreate() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      RTELink,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

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
      <TextInput placeholder="제목" variant="filled" size="xl" />
      <Space h="xl" />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content mih={500} />
      </RichTextEditor>
      <Space h="xl" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button color="red">작성하기</Button>
      </Box>
    </Box>
  );
}
