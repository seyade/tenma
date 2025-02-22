import Sidebar from "@/components/Sidebar";
import { Settings } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen plusjakartasans">
      <Sidebar />

      <div className="grid grid-cols-12 w-full gap-2 py-3 px-4  bg-yellow-100/20">
        <header className="flex col-span-full">
          <h1 className="spacegrotesk flex-1 text-4xl">Dashboard</h1>
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-full w-10 h-10 bg-slate-900 text-white text-lg flex items-center justify-center">
                JB
              </div>
              <span className="rounded-full w-8 h-8 bg-white flex items-center justify-center">
                <Settings />
              </span>
            </div>
          </div>
        </header>
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
