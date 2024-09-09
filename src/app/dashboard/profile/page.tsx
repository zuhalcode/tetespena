"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  email: z.string().email(),
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

  useEffect(() => {
    document.title = "Profile | General";
  }, []);

  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">General Settings</p>
        <p className="text-sm">Update your username and manage your account.</p>
      </div>
      <div className="w-2/12 border-b border-slate-600" />

      {/* Form */}
      <Form {...form}>
        <form className="w-2/3 space-y-6" onSubmit={handleOnSubmit}>
          <FormField
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl className="bg-transparent">
                    <Input
                      className="text-slate-200"
                      {...field}
                      placeholder="Name"
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
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="bg-transparent">
                    <Input
                      {...field}
                      type="email"
                      className="text-slate-200"
                      placeholder="Email"
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
                  <FormControl className="bg-transparent">
                    <Textarea
                      {...field}
                      className="text-slate-200"
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
