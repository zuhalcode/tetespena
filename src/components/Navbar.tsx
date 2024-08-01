"use client";

import { LayoutGrid, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { isSignedIn } = useUser();

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
      className={`${isFixed ? "mt-0 w-full" : "mt-10 w-11/12 rounded-full"} fixed left-0 right-0 top-0 z-10 mx-auto flex justify-between gap-10 border bg-white px-12 py-6 shadow-sm transition-all duration-300`}
    >
      <div className="flex items-center justify-center gap-3">
        <Search className="h-5 w-5 text-blue-600" />
        <p className="">Quick Search ...</p>
      </div>
      <div className="flex items-center">
        <h1 className="text-center text-2xl font-bold uppercase">
          <div className="w-44">
            <Image
              src="/images/tetespena.png"
              width={100}
              height={100}
              layout="responsive"
              alt="Picture of the author"
            />
          </div>
        </h1>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="">
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
        <LayoutGrid className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Navbar;
