"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

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
import useTitle from "@/hooks/useTitle";

const formSchema = z
  .object({
    "new-password": z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/(?=.*\d)/, {
        message: "Password must contain at least one number",
      }),

    "confirm-password": z.string(),
  })
  .superRefine((values, ctx) => {
    if (values["new-password"] !== values["confirm-password"]) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm-password"],
        message: "Passwords do not match!",
      });
    }
  });

type FormSchema = z.infer<typeof formSchema>;

const Page = () => {
  useTitle("Profile | Password");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control } = form;

  const handleOnSubmit = handleSubmit((values) => alert(values));

  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">Password Settings</p>
        <p className="text-sm">
          Make new password and type it in Confirm Password.
        </p>
      </div>
      <div className="w-2/12 border-b border-slate-600" />

      {/* Form */}
      <Form {...form}>
        <form className="w-2/3 space-y-6" onSubmit={handleOnSubmit}>
          <FormField
            control={control}
            name="new-password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl className="bg-transparent">
                    <Input
                      {...field}
                      className="text-slate-200"
                      placeholder="New Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={control}
            name="confirm-password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl className="bg-transparent">
                    <Input
                      {...field}
                      className="text-slate-200"
                      placeholder="Confirm Password"
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
