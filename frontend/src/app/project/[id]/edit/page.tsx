"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Columns2, Rows2 } from "lucide-react";
import * as actions from "@/actions";
import CodeEditor from "@/components/CodeEditor";
import Sidebar from "@/components/Sidebar";

const defaultEditorCode = `const App = () => {
  return (
    <div className="p-4">
      <div className="p-5 border rounded-xl">
        <h1 className="pb-2 mb-4 font-extrabold text-2xl text-slate-600 border-b">Welcome to Ten.ma</h1>
        <h2 className="font-semibold text-lg text-slate-900">Be seen by others.</h2>
        <p>Start your journey by coding your favourite work and get hired.</p>
      </div>
    </div>
  );
}`;

const ProjectEditor = ({ params }: { params: Promise<{ id: string }> }) => {
  const [code, setCode] = useState<string>(defaultEditorCode);
  const [panelsDirection, setPanelsDirection] = useState<
    "horizontal" | "vertical"
  >("horizontal");

  const handlePanelsDirection = () => {
    // TODO: persist pane position for user
    setPanelsDirection(
      panelsDirection === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const handleEditorOnChange = (code: string, event: any) => {
    console.log("CODE:::", code);
    setCode(code);
  };

  const showEditorValue = () => {
    console.log(code);
  };

  const onSaveProject = actions.handleSaveProject.bind(null, params, {
    projectTitle: "Project First",
    code,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="plusjakartasans flex h-screen bg-yellow-100/20"
    >
      <Sidebar />

      <div className="grid grid-cols-12 w-full h-full py-3 px-4">
        <header className="col-span-full flex justify-between mb-6">
          <h1 className="spacegrotesk flex-1 text-3xl font-semibold">
            Edit Project
          </h1>

          <div className="flex-1 text-right">
            <button
              className="inline-flex items-center py-2 pl-4 pr-2 mr-4 bg-green-700 text-white text-sm rounded-full"
              onClick={onSaveProject}
            >
              Save
              <ArrowRight className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
            </button>

            <button
              className="inline-flex items-center py-2 pl-4 pr-2 bg-slate-900 text-white text-xs rounded-full"
              onClick={handlePanelsDirection}
            >
              Change pane View
              {panelsDirection ? (
                <Rows2 className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
              ) : (
                <Columns2 className="ml-2 text-slate-950 bg-slate-200 rounded-full p-1" />
              )}
            </button>
          </div>
        </header>

        <section className="col-span-full row-span-12">
          <CodeEditor code={code} onChange={handleEditorOnChange} />
        </section>
      </div>
    </motion.div>
  );
};

export default ProjectEditor;
