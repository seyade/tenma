import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen plusjakartasans">
      <Sidebar />

      <div className="grid grid-cols-12 w-full gap-2 py-3 px-4 bg-stone-100">
        <AppHeader
          pageTitle="Dashboard"
          className="flex-1 w-full col-span-full h-fit"
        />

        <div className="col-span-full grid grid-cols-2 gap-2">
          <div className="bg-zinc-300 rounded-xl p-3">1</div>
          <div className="bg-zinc-400 rounded-xl p-3">2</div>
        </div>
        <div className="col-span-full grid grid-cols-3 gap-2">
          <div className="bg-zinc-300 rounded-xl p-3">1</div>
          <div className="bg-zinc-400 rounded-xl p-3">2</div>
          <div className="bg-zinc-500 rounded-xl p-3">3</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
