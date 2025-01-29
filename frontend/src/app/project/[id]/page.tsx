import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Project = (props: Props) => {
  return (
    <div className="plusjakartasans">
      <header className="flex justify-between mb-6">
        <h1 className="spacegrotesk flex-1 text-3xl font-semibold">Project</h1>
        <Link
          className="inline-flex items-center py- pl-4 pr-2 mr-4 bg-green-700 text-white text-sm rounded-full"
          href="/project/1/edit"
        >
          Edit
          <Pencil className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
        </Link>
      </header>
    </div>
  );
};

export default Project;
