"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ReactNode } from "react";

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
import { Facebook, Instagram, Youtube } from "lucide-react";
import useTitle from "@/hooks/useTitle";

const formSchema = z.object({
  youtube: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

type SocialName = "youtube" | "facebook" | "instagram"; // Add more names as needed
type SocialProps = {
  name: SocialName;
  icon: ReactNode;
  placeholder: string;
};

const socials: SocialProps[] = [
  {
    name: "youtube",
    icon: <Youtube className="h-5 w-5 text-slate-200" />,
    placeholder: "www.youtube.com",
  },
  {
    name: "facebook",
    icon: <Facebook className="h-5 w-5 text-slate-200" />,
    placeholder: "www.facebook.com",
  },
  {
    name: "instagram",
    icon: <Instagram className="h-5 w-5" />,
    placeholder: "www.instagram.com",
  },
];

const Page = () => {
  useTitle("Profile | Socials");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, control } = form;
  const handleOnSubmit = handleSubmit((values) => alert(values));

  return (
    <div className="space-y-8 px-16 pb-16 pt-10 text-white">
      <div className="space-y-3">
        <p className="text-xl font-semibold">Socials Settings</p>
        <p className="text-sm">Add elsewhere links to your profile.</p>
      </div>
      <div className="w-2/12 border-b border-slate-600" />

      {/* Form */}
      <Form {...form}>
        <form className="w-2/3 space-y-6" onSubmit={handleOnSubmit}>
          {socials.map((item, i) => (
            <FormField
              key={i}
              control={control}
              name={item.name}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="capitalize">{item.name}</FormLabel>
                    <FormControl className="bg-transparent">
                      <div className="flex w-full items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-l-lg border p-1">
                          {item.icon}
                        </div>

                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          className="rounded-l-none border-l-0 bg-transparent text-slate-200 outline-1 outline-slate-800"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* Form */}
    </div>
  );
};

export default Page;
