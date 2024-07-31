import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return (
    <div className="w-full px-8 py-5 text-white">
      <div className="flex gap-5">
        <div className="h-24 w-24 rounded-full bg-white" />
        <div className="flex flex-col gap-3">
          <Button>Ubah</Button>
          <Button>Hapus</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
