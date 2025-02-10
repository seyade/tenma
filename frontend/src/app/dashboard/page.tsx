import { House, LayoutPanelLeft, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen plusjakartasans">
      <aside className="bg-white p-4">
        <Link href="/">
          <House />
        </Link>

        <Link href={`/project/${1}`}>
          <LayoutPanelLeft />
        </Link>
      </aside>
      <div className="grid grid-cols-12 w-full gap-2 bg-yellow-100/20">
        <header className="col-span-full">
          <h1 className="spacegrotesk flex-1 text-4xl">Dashboard</h1>
          <div>
            <div>
              <div className="rounded-full w-8 h-8 bg-slate-900 text-white flex items-center justify-center">
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
