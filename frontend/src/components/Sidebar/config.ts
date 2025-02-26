import {
  Binoculars,
  FolderKanban,
  House,
  LayoutDashboard,
  Settings,
} from "lucide-react";

type Route = {
  name?: string;
  icon: any;
  link: string;
  enabled?: boolean;
  auth?: boolean;
};

export const routes = [
  {
    name: "home",
    icon: House,
    link: `/`,
    enabled: true,
    auth: false,
  },
  {
    name: "dashboard",
    icon: LayoutDashboard,
    link: `/dashboard`,
    enabled: true,
    auth: false,
  },
  {
    name: "explore",
    icon: Binoculars,
    link: `/project/${1}/explore`,
    enabled: true,
    auth: false,
  },
  {
    name: "project",
    icon: FolderKanban,
    link: `/project/${1}`,
    enabled: true,
    auth: false,
  },
  {
    name: "settings",
    icon: Settings,
    link: `/project/${1}`,
    enabled: true,
    auth: false,
  },
] as Route[];
