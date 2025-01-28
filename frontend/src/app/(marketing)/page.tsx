import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <header className="flex gap-4">
          <Link href="/explore">Explore</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/project/1">Project</Link>
          <Link href="/register">Join</Link>
          <Link href="/sign-in">Sign in</Link>
        </header>
        <h1>Tenma</h1>
      </main>
    </div>
  );
}
