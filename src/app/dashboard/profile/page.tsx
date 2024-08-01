"use client";

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

import { Input } from "@/components/ui/input";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().optional(),
  image: z.any().nullable(),
  // .refine((files) => files.length === 1, "File is required")
  // .refine((files) => {
  //   const file = files[0];
  //   return (
  //     file &&
  //     (file.type === "image/jpeg" ||
  //       file.type === "image/jpg" ||
  //       file.type === "image/png")
  //   );
  // }, "Only JPG and PNG file are allowed")
  // .refine(
  //   (files) => files[0]?.size <= 5 * 1024 * 1024,
  //   "File size must be less than 5MB",
  // ),
});

type FormSchema = z.infer<typeof formSchema>;

const Page = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit((values) => alert(values.name));

  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">Profile Settings</p>
        <p className="text-sm">Update your username and manage your account.</p>
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

      {/* Form */}
      <Form {...form}>
        <form className="w-2/3 space-y-6" onSubmit={handleOnSubmit}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      {...field}
                      placeholder="name"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={control}
            name="about"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="text-black"
                      placeholder="Describe myself"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* Form */}
    </div>
  );
};

export default Page;
