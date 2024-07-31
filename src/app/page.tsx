import ArticleCard from "@/components/home/ArticleCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="mt-52 flex min-h-screen flex-col items-center gap-10 pb-10">
        {/* Welcome */}
        <div className="flex w-11/12 items-center justify-between">
          {/* Content 1 */}
          <div className="flex w-full flex-col gap-14 p-10">
            <div className="flex items-center justify-start gap-3">
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

            <p className="max-w-lg text-base font-normal leading-loose tracking-normal">
              I’m a design technologist in Atlanta. I like working on the
              front-end of the web. This is my site, Zento where I blog, share
              and write tutorials…
            </p>

            <div className="">
              <p className="font-medium">Let&apos;s connect</p>
              <div className="flex w-full max-w-lg items-center space-x-2">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Get Started</Button>
              </div>
            </div>
          </div>
          {/* Content 1 */}

          {/* Content 2 */}
          <div className="flex w-full items-center justify-center">
            <div className="w-96">
              <Image
                src="/images/cover.jpg"
                width={100}
                height={100}
                layout="responsive"
                className="rounded-full object-cover"
                alt="Picture of the author"
              />
            </div>
          </div>
          {/* Content 2 */}
        </div>
        {/* Welcome */}

        {/* Trending Topics */}
        <div className="mt-10">
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
        <div className="flex w-7/12 flex-col items-center justify-center gap-10">
          {[1, 2, 3, 4, 5].map((val, i) => (
            <ArticleCard
              key={i}
              title="Crafting Engaging CSS Animations step by step guide"
              desc="In the realm of technology blogging, captivating your audience goes beyond just the written word. Incorporating eye-catching CSS animations can elevate your content and provide a dynamic user…"
            />
          ))}
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
    </main>
  );
}
