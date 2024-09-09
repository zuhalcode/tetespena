"use client";

import { useFetchArticlesUserByStatus } from "@/hooks/useArticles";
import { useAuth } from "@clerk/nextjs";

import React, { useEffect } from "react";

const Blog = () => {
  const { userId } = useAuth();
  const { data, isLoading } = useFetchArticlesUserByStatus(userId, "PUBLISHED");

  useEffect(() => {
    document.title = "Published Article";
  }, []);

  return (
    <div className="px-7 py-5">
      <div className="w-full rounded-xl bg-blue-50 px-2 pt-3">
        <div className="w-1/4 space-y-1 p-5">
          <h1 className="text-2xl font-semibold text-slate-700">
            Published Articles
          </h1>
          <h2 className="text-slate-700">Get the latest Articles</h2>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-5">
        {/* Card 1 */}
        {data?.map((article: any, i: number) => {
          const colSpan = i === 0 ? "2" : "1";

          return (
            <div
              key={i}
              className={`col-span-${colSpan} flex h-96 flex-col justify-between rounded-lg bg-red-500 px-5 pt-3`}
            >
              <div className="flex justify-end">
                <div className="w-fit cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white">
                  <p className="text-center text-sm font-medium">Edit</p>
                </div>
              </div>

              <div className="space-y-5 px-1 py-5">
                <h1 className="max-w-xl text-2xl font-semibold capitalize">
                  {article.title}
                </h1>

                <div className="flex justify-between">
                  <div className="flex gap-5 text-base">
                    <p className="">446</p>
                    <p className="">3</p>
                  </div>
                  <div className="text-sm">Wed, 17 Jul</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
