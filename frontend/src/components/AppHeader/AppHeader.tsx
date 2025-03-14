"use client";

import Link from "next/link";
import { Bell, Search, Settings } from "lucide-react";
import { useUser } from "@/context/UserProvider";

type AppHeaderProps = {
  pageTitle?: string;
  currentPath?: string;
  className?: string;
  children?: React.ReactNode;
};

const AppHeader = ({
  pageTitle,
  currentPath,
  className,
  children,
  ...props
}: AppHeaderProps) => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-3 rounded-lg bg-stone-200 font-semibold">
        <h2>Loading... Wait a sec.</h2>
      </div>
    );
  }

  if (!user || error) {
    return (
      <div className="flex justify-between items-center p-3 rounded-lg bg-red-100 text-red-500 font-semibold">
        <h2>
          Oops! Can't find the user details for the header, for some reason.
          Let's fix it!
        </h2>
      </div>
    );
  }

  const getUserInitial = (name: any) => {
    const splittedName = name.split(" ");
    const first = splittedName?.shift().substr(0, 1);
    const last = splittedName.pop().substr(0, 1);
    const initials = `${first}${last}`;

    return initials;
  };

  const initials = getUserInitial(user?.name);

  return (
    <header
      className={`flex justify-between items-center p-3 rounded-md bg-stone-200 ${
        className || ""
      }`}
      {...props}
    >
      <div className="flex flex-1 items-center">
        {pageTitle && (
          <h1 className="spacegrotesk mr-4 border text-4xl">{pageTitle}</h1>
        )}
        <div className="flex flex-1 items-center bg-white border rounded-lg px-3 py-2">
          <Search />
          <input
            type="text"
            className="text-xl px-2 inline-block w-full outline-none"
            placeholder="Looking for something?"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-4 justify-end">
        <Bell className="rounded-full bg-white p-1" size={32} />
        <Link href="/settings">
          <Settings className="rounded-full bg-white p-1" size={32} />
        </Link>

        <Link href={`/user/${1}`}>
          <div className="rounded-full w-8 h-8 bg-pink-950 text-white text-sm font-semibold flex items-center justify-center">
            {initials.toUpperCase()}
          </div>
        </Link>
      </div>

      <div className="ml-5">{children}</div>
    </header>
  );
};

export default AppHeader;
