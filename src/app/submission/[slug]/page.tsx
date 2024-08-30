"use client";

import ProfileBar from "@/components/dashboard/profile-bar";

import { EditorContent } from "@tiptap/react";

import ToolbarButton from "@/components/submission/toolbar-button";
import { useCallback, useEffect, useState } from "react";
import { ToolbarHeading } from "@/components/submission/toolbar-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import useTitle from "@/hooks/useTitle";
import { useFetchArticleBySlug, useUpdateArticle } from "@/hooks/useArticles";
import Loading from "@/components/loading";
import { createToolbarButton, useTiptapEditor } from "@/hooks/useTiptapEditor";
import { useUser } from "@clerk/nextjs";

import ProtectedPage from "@/components/auth/protected-page";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  useTitle("Create Article");

  const { user } = useUser();
  const { slug } = useParams();
  const router = useRouter();

  const { data, isLoading } = useFetchArticleBySlug(slug);
  const content = data?.content;

  const [title, setTitle] = useState<string>("");
  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const editor = useTiptapEditor(content);

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

  const toolbarButtons = createToolbarButton(editor, setLink);

  const { mutate, isPending } = useUpdateArticle({
    onSuccess: () => {
      toast("Draft Saved", {
        description: "Your content has been successfully saved.",
        duration: 1500,
      });
    },
    onError: () => {
      toast("Error", {
        description: "There was an issue saving your content.",
      });
    },
  });

  const handleDraftContent = async () => {
    const content = editor?.getJSON()!;
    const id = data?.id;
    const userId = user?.id!;

    mutate({ content, title, id, userId });
  };

  useEffect(() => {
    if (editor && data) {
      editor.commands.setContent(data.content);
      setTitle(data.title);
    }
  }, [editor, data]);

  useEffect(() => {
    if (!isLoading && data) {
      if (user) {
        if (data.userId !== user.id) router.push("/dashboard");
      }
    }
  }, [data, isLoading, router, user]);

  return (
    <ProtectedPage>
      <div className="flex bg-[#1d2633]">
        <div className="min-h-screen w-full">
          <div className="fixed z-10 w-full bg-[#1d2633]">
            <ProfileBar useLogo />

            <div
              className={`z-10 mt-16 w-full overflow-auto bg-[#253142] py-5 xl:py-4`}
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

            {/* Footer */}
            <div className="flex w-full gap-2 border-t border-t-slate-200 bg-[#253142] py-5 pl-3 xl:pl-14">
              <Button
                variant="secondary"
                className="rounded-xl px-5 py-6 text-base"
              >
                Publish
              </Button>
              <Button
                variant="secondary"
                className="rounded-xl px-6 py-6 text-base"
                onClick={handleDraftContent}
                disabled={isPending}
              >
                {isPending ? <Loading size="xs" /> : "Save Draft"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default Page;
