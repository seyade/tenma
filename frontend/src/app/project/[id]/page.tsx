import Sidebar from "@/components/Sidebar";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const Project = () => {
  return (
    <div className="flex h-screen plusjakartasans">
      <Sidebar />

      <div className="py-3 px-4 w-full">
        <header className="flex justify-between mb-6 w-full">
          <h1 className="spacegrotesk flex-1 text-3xl font-semibold">
            Project Name
          </h1>
          <Link
            className="inline-flex items-center py- pl-4 pr-2 mr-4 bg-green-700 text-white text-sm rounded-full"
            href="/project/1/edit"
          >
            Edit
            <Pencil className="ml-2 text-slate-950 bg-slate-100 rounded-full p-1" />
          </Link>
        </header>

        <section>
          <p>TODO: Show Project UI and details here</p>
        </section>
      </div>
    </div>
  );
};

export default Project;
