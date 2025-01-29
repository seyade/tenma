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

  const handleSave = () => {
    // TODO: capture the code and save it
  };

  return (
    <div className="plusjakartasans flex">
      <aside className="bg-white p-1">Sidebar</aside>
      <div className="w-full py-3  px-4">
        <header className="flex justify-between mb-6">
          <h1 className="spacegrotesk flex-1 text-3xl font-semibold">
            Edit Project
          </h1>

          <div className="flex-1 text-right">
            <button
              className="py-2 px-4 mr-4 bg-green-600 text-white text-xs rounded-full"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="py-2 px-4 bg-slate-900 text-white text-xs rounded-full"
              onClick={handleSwitchView}
            >
              Change pane View
            </button>
          </div>
        </header>

        <section>
          <Editor id="1" code="{/* write some code */}" stacked={stackedView} />
        </section>
      </div>
    </div>
  );
};

export default ProjectEditor;
