"use client";

import ArticleCard from "@/components/home/ArticleCard";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import { useFetchArticles } from "@/hooks/useArticles";

import Loading from "@/components/loading";
import { motion } from "framer-motion";
import useSaveUserData from "@/hooks/useUser";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useSaveUserData();

  const { data, isLoading } = useFetchArticles();

  const getFirstParagraph = (article: any) => {
    if (article) {
      const doc = article.content;
      const contents = doc.content;

      for (const node of contents) {
        if (node.type === "paragraph" && Array.isArray(node.content)) {
          return node.content
            .map((textNode: { text: string }) => textNode.text)
            .join("");
        }
      }
    }

    return null; // Jika tidak ditemukan paragraph
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <div className="mt-48 flex min-h-screen flex-col items-center gap-10 pb-10 sm:mt-32 xl:mt-52">
        {/* Welcome */}
        <div className="flex w-full flex-col items-center justify-center md:flex-row xl:w-11/12 xl:justify-between">
          {/* Content 1 */}
          <div className="order-2 flex w-full flex-col gap-14 px-5 pt-10 md:order-1 md:pl-16 xl:row-start-1 xl:p-10">
            <div className="flex flex-col items-center justify-start gap-3 sm:flex-row sm:justify-center md:flex-col md:items-start lg:flex-row lg:justify-start">
              <h1 className="text-justify text-4xl font-medium">Welcome to</h1>
              <div className="mt-1 w-48">
                <Image
                  src="/images/tetespena.png"
                  width={100}
                  height={100}
                  layout="responsive"
                  alt="Picture of the author"
                />
              </div>
            </div>

            <p className="text-justify text-base font-normal leading-loose tracking-normal xl:max-w-lg">
              A space to share and inspire. Easily craft and publish impactful
              articles with our intuitive tools. Join us today and let your
              words make a difference.
            </p>

            <div>
              <Link
                href="submission"
                className="flex w-full items-center space-x-2 bg-red-400 sm:max-w-full xl:max-w-lg"
              >
                <Button type="button" className="w-full uppercase">
                  Start Write
                </Button>
              </Link>
            </div>
          </div>
          {/* Content 1 */}

          {/* Content 2 with Image */}
          <motion.div className="order-1 flex w-full items-center justify-center md:order-2">
            <div className="w-40 sm:w-64 lg:w-96">
              <Image
                src="/images/cover.jpg"
                width={100}
                height={100}
                layout="responsive"
                className="rounded-full object-cover"
                alt="Picture of the author"
              />
            </div>
          </motion.div>
          {/* Content 2 */}
        </div>
        {/* Welcome */}

        {/* Trending Topics */}
        <div className="mt-10 hidden">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-xl font-semibold">Trending Topics</h1>
            <div className="flex items-center gap-10 rounded-full border bg-white px-12 py-5 shadow-sm">
              {["HTML", "CSS", "JS", "PHP", "JEST"].map((val, i) => (
                <div
                  className="flex flex-col items-center justify-center gap-1"
                  key={i}
                >
                  <div className="h-14 w-14 items-center justify-center rounded-full border bg-red-500 text-white" />
                  <p className="text-sm font-medium">{val}</p>
                </div>
              ))}
              <div className="flex items-center gap-5">
                <p className="font-semibold">or...</p>
                <div className="rounded-md bg-blue-500 px-3 py-2 text-white">
                  Subscribe
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Trending Topics */}

        {/* Article List */}
        <div className="flex w-full flex-col items-center justify-center gap-10 px-5 md:px-10 xl:w-7/12 xl:px-0">
          {isLoading ? (
            <Loading size="lg" />
          ) : (
            data?.map((article: any, i: any) => {
              const desc = getFirstParagraph(article);

              return (
                <ArticleCard
                  key={i}
                  title={article?.title}
                  slug={article?.slug}
                  desc={desc}
                  userName={article?.User.name}
                />
              );
            })
          )}
        </div>
        {/* Article List */}
      </div>

      <footer className="w-full space-y-5 bg-slate-900 px-5 pb-2 pt-5">
        <div className="mx-auto w-32">
          <Image
            src="/images/tetespena.png"
            width={100}
            height={100}
            layout="responsive"
            alt="Picture of the author"
          />
        </div>

        <p className="text-center text-sm text-white">
          &copy; 2024 tetespena. All Right Reserved
        </p>
      </footer>
    </>
  );
}
