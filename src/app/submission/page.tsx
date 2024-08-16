"use client";

import ProfileBar from "@/components/dashboard/profile-bar";

import useTitle from "@/hooks/useTitle";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import axios from "axios";
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
import { useCallback, useState } from "react";
import { ToolbarHeading } from "@/components/submission/toolbar-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Submission = () => {
  useTitle("Create Article");

  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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

  const editor = useEditor({
    extensions,
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

  // Function to save content
  const saveContent = async () => {
    const content = editor?.getJSON();
    const data = { content, title };

    try {
      const res = await axios.post("/api/article", data);
      alert("Content saved successfully!"); // Alert for success
      router.push("/");
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <div className="flex bg-[#1d2633]">
      <div className="min-h-screen w-full">
        <div className="fixed z-10 w-full bg-[#1d2633]">
          <ProfileBar />

          <div
            className={`z-10 w-full overflow-auto bg-[#253142] py-5 xl:py-4`}
          >
            <div className="flex gap-3 pl-2 xl:pl-12">
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

        <div className="z-0 mt-44 flex min-h-[70vh] flex-col">
          <div className="mx-auto mb-3 w-11/12">
            <Input
              className="border-slate-600 bg-transparent text-lg font-semibold uppercase text-slate-200"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => handleSetTitle(e)}
            />
          </div>

          <div className="mx-auto w-11/12 flex-grow overflow-y-auto bg-[#131820] pb-5 text-white">
            <div className="relative h-fit">
              <EditorContent
                editor={editor}
                className="absolute left-0 right-0"
              />
            </div>
          </div>
          <div className="h-fit w-full bg-red-500">
            {/* {parse(
              "<p>There are three ways:</p><ol><li><p>you don't have any nodes with node views: you can simply store and render <code>getHTML()</code></p></li><li><p>you have some nodes with complex node views: store the output of <code>getJSON()</code> and render the editor with <code>editable: false</code></p></li><li><p>you have some nodes with complex node views and want to use <code>getHTML()</code> to render a string of HTML: provide always a correct <code>toDOM()</code> function. this function is used to generate the HTML and provides a proper copy/paste behavior for every node.</p></li></ol>",
            )} */}
          </div>

          {/* Footer */}
          <div className="flex w-full gap-2 border-t border-t-slate-200 bg-[#253142] py-5 pl-3 xl:pl-14">
            <Button className="rounded-xl px-5 py-6 text-base">Publish</Button>
            <Button
              className="rounded-xl px-6 py-6 text-base"
              onClick={saveContent}
            >
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submission;
