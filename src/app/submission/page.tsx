"use client";

import ProfileBar from "@/components/dashboard/profile-bar";

import useTitle from "@/hooks/useTitle";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeXml,
  Heading6,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline as U,
} from "lucide-react";

import ToolbarButton from "@/components/submission/toolbar-button";
import { useCallback } from "react";
import { ToolbarHeading } from "@/components/submission/toolbar-heading";

const Submission = () => {
  useTitle("Create Article");

  // define your extension array
  // const extensions = [];

  // const content =

  const editor = useEditor({
    extensions: [
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
    ],
    content: "<p>Start type from here ... </p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) return;
    // empty
    else if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const bubbleButtons = [
    {
      icon: <Bold className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().setItalic().run(),
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().setStrike().run(),
    },
  ];

  const toolbarButtons = [
    {
      title: "Bold",
      icon: <Bold className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: "bold",
    },
    {
      title: "Italic",
      icon: <Italic className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().setItalic().run(),
      isActive: "italic",
    },
    {
      title: "Underline",
      icon: <U className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: "underline",
    },
    {
      title: "Link",
      icon: <Link2 className="h-6 w-6" />,
      onClick: setLink,
      isActive: "link",
    },
    {
      title: "Blockquote",
      icon: <Quote className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: "blockquote",
    },
    {
      title: "Align Left",
      icon: <AlignLeft className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().setTextAlign("left").run(),
      isActive: "left",
    },
    {
      title: "Align Center",
      icon: <AlignCenter className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().setTextAlign("center").run(),
      isActive: "center",
    },
    {
      title: "Align Right",
      icon: <AlignRight className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().setTextAlign("right").run(),
      isActive: "right",
    },
    {
      title: "Justify",
      icon: <AlignJustify className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
      isActive: "justify",
    },
    {
      title: "Bullet List",
      icon: <List className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: "bulletList",
    },
    {
      title: "Ordered List",
      icon: <ListOrdered className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: "orderedList",
    },
    {
      title: "Code",
      icon: <Code className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isActive: "code",
    },
    {
      title: "Code Block",
      icon: <CodeXml className="h-6 w-6" />,
      onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: "codeBlock",
    },
  ];

  return (
    <div className="flex bg-[#1d2633]">
      <div className="h-[200vh] w-full">
        <div className="fixed z-10 w-full bg-[#1d2633]">
          <ProfileBar useLogo={true} />
          <div className={`z-10 w-full bg-[#253142] py-8`}>
            <div className="flex gap-3 px-12">
              <ToolbarHeading editor={editor} />
              {toolbarButtons.map((btn, i) => (
                <ToolbarButton
                  title={btn.title}
                  icon={btn.icon}
                  onClick={btn.onClick}
                  editor={editor}
                  isActive={btn.isActive}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-48 w-11/12 bg-[#131820] p-5 text-white">
          {/* <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex w-fit items-center gap-3 rounded-lg border border-slate-500 px-3 py-1">
              <div className="flex gap-3 border-slate-200">
                {bubbleButtons.map(({ icon, onClick }, i) => (
                  <BubbleButton
                    key={i}
                    editor={editor}
                    icon={icon}
                    onClick={onClick}
                  />
                ))}
              </div>

              <div className="h-5 border-r-[1.5px] border-slate-500" />

              <HeadingDropdown />
            </div>
          </BubbleMenu> */}
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Submission;
