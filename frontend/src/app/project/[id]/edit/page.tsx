"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Editor from "@/components/Sandbox";

// const Editor = dynamic(() => import("@/components/Sandbox"), { ssr: false });

type Props = {};

const ProjectEditor = (props: Props) => {
  const [code, setCode] = useState<string>("");
  const [stackedView, setStackedView] = useState(false);

  const handleSwitchView = () => {
    setStackedView(!stackedView);
  };

  return (
    <div className="plusjakartasans py-3 px-4">
      <header className="flex justify-between mb-6">
        <h1 className="spacegrotesk text-3xl font-semibold">Edit Project</h1>
        <button
          className="py-2 px-4 bg-slate-900 text-white text-xs rounded-full"
          onClick={handleSwitchView}
        >
          Change pane View
        </button>
      </header>

      <section>
        <Editor id="1" code="{/* write some code */}" stacked={stackedView} />
      </section>
    </div>
  );
};

export default ProjectEditor;
