import React from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar";
const Home = () => {
  return (
    <div className="border-4 border-red-500">
      <Sidebar />
    </div>
  );
};

export default Home;
