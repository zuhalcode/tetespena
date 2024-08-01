import { UserForm } from "@/components/dashboard/user-form";
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
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return <div className="w-full space-y-8 p-16 text-white">Dashboard</div>;
};

export default Dashboard;
