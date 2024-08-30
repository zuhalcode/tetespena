"use client";

// External Libraries
import { Search } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

// Next.js Specific Imports
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Internal Imports
import { Button } from "./ui/button";
import Drawer from "./drawer";

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname
  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/submission") ||
    pathname.startsWith("/dashboard");

  const router = useRouter();

  const [isFixed, setIsFixed] = useState(false);
  const { isSignedIn } = useUser();

  const handleLogo = () => router.push("/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setIsFixed(true);
      else setIsFixed(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${isAuthPage && "hidden"} ${isFixed ? "xl:mt-0 xl:w-full" : "xl:mt-10 xl:w-11/12 xl:rounded-full"} fixed left-0 right-0 top-0 z-10 mx-auto flex w-full items-center justify-between gap-10 border bg-white px-5 py-6 shadow-sm transition-all duration-300 xl:fixed xl:px-12`}
    >
      <div className="flex items-center justify-center gap-3">
        <Search className="h-6 w-6 text-blue-600 xl:h-5 xl:w-5" />
        <p className="hidden xl:block">Quick Search ...</p>
      </div>
      <div className="flex items-center">
        <div className="w-32 cursor-pointer xl:w-44" onClick={handleLogo}>
          <Image
            src="/images/tetespena.png"
            width={100}
            height={100}
            layout="responsive"
            alt="Picture of the author"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="hidden xl:block">
          {isSignedIn ? (
            <Button>
              <SignOutButton />
            </Button>
          ) : (
            <Button>
              <SignInButton />
            </Button>
          )}
        </div>
        <Drawer />
      </div>
    </div>
  );
};

export default Navbar;
