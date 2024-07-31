import { Home, Newspaper } from "lucide-react";
import Link from "next/link";

import SidebarButton from "../ui/sidebar/sidebar-button";
import Image from "next/image";

export function Sidebar() {
  return (
    <div className="flex h-full min-h-screen w-1/4 flex-col gap-2 border-r border-r-slate-600 bg-[#212529]">
      <div className="flex h-14 items-center justify-center px-4 py-7">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <div className="mt-1 flex w-32">
            <Image
              src="/images/tetespena.png"
              width={100}
              height={100}
              layout="responsive"
              alt="Picture of the author"
            />
          </div>
        </Link>
      </div>

      <nav className="grid items-start px-2 text-sm font-medium">
        <SidebarButton
          icon={<Home className="h-4 w-4" />}
          text="Home"
          href="/dashboard"
        />
        <SidebarButton
          icon={<Newspaper className="h-4 w-4" />}
          text="Blog"
          href="/dashboard/blog"
        />
      </nav>
    </div>
  );
}
