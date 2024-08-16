import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Profile | Picture",
};

const Page = () => {
  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">Picture Settings</p>
        <p className="text-sm">Update your profile picture.</p>
      </div>
      <div className="w-2/12 border-b border-slate-600" />

      {/* Profile Picture */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">Profile Picture</p>
        <div className="flex gap-5">
          <div className="h-2 w-2/12 rounded-lg">
            <Image
              src="/images/default.png"
              width={100}
              height={100}
              layout="responsive"
              alt="Picture of the author"
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Change Profile</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-full bg-[#1F2937]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="border-b border-slate-600 pb-5 text-center text-slate-200">
                    Upload Image
                  </AlertDialogTitle>
                  <AlertDialogDescription className="py-3">
                    <div className="flex h-40 w-full flex-col items-center justify-center space-y-1 rounded-lg bg-[#1C2531]">
                      <ImagePlus className="mb-3 h-10 w-10" strokeWidth={1} />
                      <p className="cursor-pointer text-sm font-medium text-blue-300 hover:text-indigo-400">
                        Upload a file
                      </p>
                      <p className="text-xs text-slate-400">JPG or PNG</p>
                    </div>
                  </AlertDialogDescription>
                  <div className="border-b border-slate-600" />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="destructive">Delete Profile</Button>
          </div>
        </div>
      </div>
      {/* Profile Picture */}
    </div>
  );
};

export default Page;
