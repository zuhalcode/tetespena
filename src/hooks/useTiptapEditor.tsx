import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeXml,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline as U,
} from "lucide-react";

// define your extension array
const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Link,
  Underline,
  Placeholder.configure({
    // Use different placeholders depending on the node type:
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "What’s the title?";
      }

      return "Type your content here …";
    },
  }),
];

export const createBubbleButton = (editor: Editor | null) => [
  {
    icon: <Bold />,
    onClick: () => editor?.chain().focus().toggleBold().run(),
  },
  {
    icon: <Italic />,
    onClick: () => editor?.chain().focus().setItalic().run(),
  },
  {
    icon: <Strikethrough />,
    onClick: () => editor?.chain().focus().setStrike().run(),
  },
];

export const createToolbarButton = (
  editor: Editor | null,
  setLink: () => void,
) => [
  {
    title: "Bold",
    icon: <Bold />,
    onClick: () => editor?.chain().focus().toggleBold().run(),
    isActive: "bold",
  },
  {
    title: "Italic",
    icon: <Italic />,
    onClick: () => editor?.chain().focus().setItalic().run(),
    isActive: "italic",
  },
  {
    title: "Underline",
    icon: <U />,
    onClick: () => editor?.chain().focus().toggleUnderline().run(),
    isActive: "underline",
  },
  {
    title: "Link",
    icon: <Link2 />,
    onClick: setLink,
    isActive: "link",
  },
  {
    title: "Blockquote",
    icon: <Quote />,
    onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    isActive: "blockquote",
  },
  {
    title: "Align Left",
    icon: <AlignLeft />,
    onClick: () => editor?.chain().focus().setTextAlign("left").run(),
    isActive: { textAlign: "left" },
  },
  {
    title: "Align Center",
    icon: <AlignCenter />,
    onClick: () => editor?.chain().focus().setTextAlign("center").run(),
    isActive: { textAlign: "center" },
  },
  {
    title: "Align Right",
    icon: <AlignRight />,
    onClick: () => editor?.chain().focus().setTextAlign("right").run(),
    isActive: { textAlign: "right" },
  },
  {
    title: "Justify",
    icon: <AlignJustify />,
    onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
    isActive: { textAlign: "justify" },
  },
  {
    title: "Bullet List",
    icon: <List />,
    onClick: () => editor?.chain().focus().toggleBulletList().run(),
    isActive: "bulletList",
  },
  {
    title: "Ordered List",
    icon: <ListOrdered />,
    onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    isActive: "orderedList",
  },
  {
    title: "Code",
    icon: <Code />,
    onClick: () => editor?.chain().focus().toggleCode().run(),
    isActive: "code",
  },
  {
    title: "Code Block",
    icon: <CodeXml />,
    onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
    isActive: "codeBlock",
  },
];

export const useTiptapEditor = (
  content?: JSONContent,
  editable: boolean = true,
) => {
  return useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none`,
      },
    },
    editable,
    content: content || null,
  });
};
