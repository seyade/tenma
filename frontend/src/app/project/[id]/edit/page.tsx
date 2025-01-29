"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Editor from "@/components/Sandbox";
import {
  ArrowRight,
  Columns2,
  House,
  LayoutPanelLeft,
  MoveRight,
  Rows2,
} from "lucide-react";
import Link from "next/link";

// const Editor = dynamic(() => import("@/components/Sandbox"), { ssr: false });

type Props = {};

const ProjectEditor = (props: Props) => {
  const [code, setCode] = useState<string>("");
  const [stackedView, setStackedView] = useState(false);

  const handleSwitchView = () => {
    // TODO: persist pane position for user
    setStackedView(!stackedView);
  };

  const handleSave = () => {
    // TODO: capture the code and save it
  };

  return (
    <div className="plusjakartasans flex">
      <aside className="bg-white p-4">
        <Link href="/">
          <House />
        </Link>

        <Link href="/project/1">
          <LayoutPanelLeft />
        </Link>
      </aside>
      <div className="w-full py-3  px-4">
        <header className="flex justify-between mb-6">
          <h1 className="spacegrotesk flex-1 text-3xl font-semibold">
            Edit Project
          </h1>

          <div className="flex-1 text-right">
            <button
              className="inline-flex items-center py-2 pl-4 pr-2 mr-4 bg-green-700 text-white text-sm rounded-full"
              onClick={handleSave}
            >
              Save
              <ArrowRight className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
            </button>

            <button
              className="inline-flex items-center py-2 pl-4 pr-2 bg-slate-900 text-white text-xs rounded-full"
              onClick={handleSwitchView}
            >
              Change pane View
              {stackedView ? (
                <Rows2 className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
              ) : (
                <Columns2 className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
              )}
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
