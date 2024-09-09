"use client";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { EditorContent } from "@tiptap/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BookOpen } from "lucide-react";
import { useFetchArticleBySlug } from "@/hooks/useArticles";
import Loading from "@/components/loading";
import { useTiptapEditor } from "@/hooks/useTiptapEditor";

const Page = ({ params }: { params: { slug: string } }) => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState();

  const slug = params?.slug;

  const { data: article, isLoading } = useFetchArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      setTitle(article.title);

      const content = article.content;
      setContent(content);
    }
  }, [article]);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  const createdAtDate = new Date(article?.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  const TiptapRenderer = () => {
    const editor = useTiptapEditor({ content, editable: false });
    return <EditorContent editor={editor} />;
  };

  return (
    <div className="mt-28 flex min-h-screen flex-col items-center gap-10 pb-10 sm:mt-32 xl:mt-52">
      {/* Image Cover */}
      <div className="mt-1 flex w-full flex-col items-center space-y-8 md:w-11/12 xl:space-y-12">
        <Image
          src="/images/landscape.jpg"
          width={100}
          height={100}
          layout="responsive"
          alt="Picture of the author"
          className="shadow-[5px_10px_20px_rgba(0,0,0,0.3)] md:rounded-xl"
        />

        <div className="space-y-7">
          <h1 className="mx-auto max-w-52 text-center text-2xl font-bold capitalize leading-snug text-[#002050] sm:max-w-96 md:max-w-md md:text-3xl lg:max-w-3xl lg:text-4xl xl:max-w-2xl">
            {article?.title}
          </h1>

          <div className="flex items-center justify-center gap-3 sm:ml-24 lg:ml-0">
            <Avatar className="h-6 w-6 lg:h-7 lg:w-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-3">
              <div className="mx-auto flex items-center gap-3">
                <div className="items-center gap-1 sm:flex">
                  <span className="text-xs font-medium lg:text-sm">By </span>
                  <span className="w-96 cursor-pointer items-center gap-2 text-xs font-bold text-[#345Afa] transition-colors duration-100 hover:text-[#002050] sm:flex lg:text-sm lg:font-semibold">
                    {article?.User.name}
                    <span className="mx-1 text-base font-semibold text-[#345Afa] lg:text-lg">
                      ~
                    </span>
                    <span className="text-xs font-medium text-slate-500 lg:text-sm">
                      {createdAtDate}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500 lg:ml-5 lg:text-sm">
                      <BookOpen className="h-4 w-4" /> <span>5 min read</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Cover */}

      {/* Articles */}
      <div className="tiptap-output mx-auto mt-10 w-full px-5 sm:mt-3 md:px-10 lg:px-16 xl:mt-10 xl:w-7/12 xl:px-0">
        {isLoading ? <Loading /> : <TiptapRenderer />}
      </div>
      {/* Articles */}
    </div>
  );
};

export default Page;
