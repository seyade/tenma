import { Bell, Search, Settings } from "lucide-react";
import Link from "next/link";

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
  return (
    <header
      className={`flex justify-between items-center p-3 rounded-lg bg-stone-200 ${
        className || ""
      }`}
      {...props}
    >
      <div className="flex flex-1 items-center">
        {pageTitle && (
          <h1 className="spacegrotesk border text-4xl">{pageTitle}</h1>
        )}
      </div>

      <div className="flex flex-1 items-center bg-white border rounded-lg px-3 py-2">
        <Search />
        <input
          type="text"
          className="text-xl px-2 inline-block w-full outline-none"
          placeholder="Looking for something?"
        />
      </div>

      <div className="flex flex-1 gap-4 justify-end">
        <Bell className="rounded-full bg-white p-1" size={32} />
        <Link href="/settings">
          <Settings className="rounded-full bg-white p-1" size={32} />
        </Link>

        <Link href={`/user/${1}`}>
          <div className="rounded-full w-8 h-8 bg-pink-950 text-white text-sm font-semibold flex items-center justify-center">
            JB
          </div>
        </Link>
      </div>

      <div>{children}</div>
    </header>
  );
};

export default AppHeader;
