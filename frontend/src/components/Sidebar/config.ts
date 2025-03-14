import {
  Binoculars,
  FolderKanban,
  House,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

type SidebarRoute = {
  name?: string;
  type: "primary" | "secondary";
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
    type: "primary",
    enabled: true,
    auth: false,
  },
  {
    name: "dashboard",
    icon: LayoutDashboard,
    link: `/dashboard/${1}`,
    type: "primary",
    enabled: true,
    auth: false,
  },
  {
    name: "explore",
    icon: Binoculars,
    link: `/project/${1}/explore`,
    type: "primary",
    enabled: true,
    auth: false,
  },
  {
    name: "project",
    icon: FolderKanban,
    link: `/project/${1}`,
    type: "primary",
    enabled: true,
    auth: false,
  },
  {
    name: "profile",
    icon: User,
    link: `/profile/${1}`,
    type: "secondary",
    enabled: true,
    auth: false,
  },
  {
    name: "settings",
    icon: Settings,
    link: `/project/${1}`,
    type: "secondary",
    enabled: true,
    auth: false,
  },
] as SidebarRoute[];
