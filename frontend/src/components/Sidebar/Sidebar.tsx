import {
  Binoculars,
  FolderKanban,
  House,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

import { routes } from "./config";

type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
  const secondaryLinks = /^(settings|profile)$/;

  return (
    <aside className="flex flex-col items-center bg-white p-3 border border-r-slate-300 shadow-lg w-20">
      <div className="block mb-6 text-center">
        <span className="spacegrotesk flex justify-center items-center h-4 w-4 p-5 bg-zinc-900 text-white font-black rounded-full">
          //.
        </span>
      </div>

      <div className="flex flex-col items-center justify-between">
        <nav className="pb-4 mb-4 border-b">
          {routes.map(({ name, icon: Icon, link }, index) => {
            return (
              !name?.match(secondaryLinks) && (
                <Link
                  key={name}
                  className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
                  href={link}
                >
                  <Icon />
                </Link>
              )
            );
          })}
        </nav>
        <div>
          <Link
            className="block p-2 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200"
            href={`/user/${1}`}
          >
            <User />
          </Link>
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
