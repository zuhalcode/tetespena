import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog",
};

const Blog = () => {
  return (
    <div className="px-7 py-5">
      <div className="w-full rounded-xl bg-blue-50 px-2 pt-3">
        <div className="w-1/4 space-y-1 p-5">
          <h1 className="text-2xl font-semibold text-slate-700">Blog App</h1>
          <h2 className="text-slate-700">Get the latest Articles</h2>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="col-span-2 flex h-96 flex-col justify-between rounded-lg bg-red-500 px-5 pt-3">
          <div className="flex justify-end">
            <div className="w-fit cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white">
              <p className="text-center text-sm font-medium">Edit</p>
            </div>
          </div>

          <div className="space-y-5 px-1 py-5">
            <h1 className="max-w-xl text-2xl font-semibold">
              Early Black Friday Amazon deals: cheap TVs, headphones, laptops
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

        {/* Card 2 */}
        <div className="col-span-1 flex h-96 flex-col justify-between rounded-lg bg-red-500 px-5 pt-3">
          <div className="flex justify-end">
            <div className="w-fit cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white">
              <p className="text-center text-sm font-medium">Edit</p>
            </div>
          </div>

          <div className="space-y-5 px-1 py-5">
            <h1 className="max-w-xl text-2xl font-semibold">
              Presented by Max Rushden with Barry Glendenning, Philippe Auclair
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

        {/* Card 3 */}
        <div className="col-span-1 flex h-96 flex-col justify-between rounded-lg bg-red-500 px-5 pt-3">
          <div className="relative h-full w-full bg-[url('/svg/login.svg')]">
            <div className="flex justify-end">
              <div className="w-fit cursor-pointer rounded-full bg-blue-500 px-3 py-1 text-white">
                <p className="text-center text-sm font-medium">Edit</p>
              </div>
            </div>
          </div>

          <div className="space-y-5 px-1 py-5">
            <h1 className="max-w-xl text-2xl font-semibold">
              Presented by Max Rushden with Barry Glendenning, Philippe Auclair
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

        <div className="col-span-1 bg-blue-500">Card2</div>
        <div className="col-span-1">Card4</div>
        <div className="col-span-1">Card5</div>
        <div className="col-span-1">Card6</div>
      </div>
    </div>
  );
};

export default Blog;
