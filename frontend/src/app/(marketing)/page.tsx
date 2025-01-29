import Link from "next/link";

export default function Home() {
  return (
    <div className="plusjakartasans">
      <main className="flex flex-col gap-8 row-start-2">
        <header className="flex justify-between items-center py-5 px-4">
          <h1 className="font-bold text-3xl">Ten.ma</h1>
          <nav className="flex gap-4 font-semibold">
            <Link href="/explore">Explore</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/project/1">Project</Link>
          </nav>
          <div className="flex gap-4 font-semibold">
            <Link
              className="py-2 px-5 bg-amber-500 rounded-full"
              href="/register"
            >
              Join
            </Link>
            <Link
              className="py-2 px-5 bg-amber-300 rounded-full"
              href="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </header>
      </main>
    </div>
  );
}
