import {
  Binoculars,
  FolderKanban,
  House,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  return (
    <aside className="flex flex-col items-center bg-white p-3 border border-r-slate-300 shadow-lg w-20">
      <div className="block mb-6 text-center">
        <span className="spacegrotesk flex justify-center items-center h-4 w-4 p-5 bg-zinc-900 text-white font-black rounded-full">
          Ta.
        </span>
      </div>

      <div className="flex flex-col items-center justify-between">
        <nav className="pb-4 mb-4 border-b">
          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href="/"
          >
            <House />
          </Link>

          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href="/dashboard"
          >
            <LayoutDashboard />
          </Link>

          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href={`/project/${1}/explore`}
          >
            <Binoculars />
          </Link>

          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href={`/project/${1}`}
          >
            <FolderKanban />
          </Link>
        </nav>
        <div>
          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href={`/project/${1}`}
          >
            <Settings />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
