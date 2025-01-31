"use client";

import { useState } from "react";
import Editor from "@/components/Sandbox";
import {
  ArrowRight,
  Columns2,
  House,
  LayoutPanelLeft,
  Rows2,
} from "lucide-react";
import Link from "next/link";
import * as actions from "@/actions";

const codeSample = `
  function Card() {
    return(
      <div style={{ 
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "16px" 
      }}>
        <h3 style={{ fontWeight: "bold" }}>Card Title Here</h3>
        <p>Card content here</p>
      </div>
    );
  }
`;

const ProjectEditor = ({ params }: { params: Promise<{ id: string }> }) => {
  const [code, setCode] = useState<string>(
    "{/* Start writing your code here */}"
  );
  const [stackedView, setStackedView] = useState(false);

  const handleSwitchView = () => {
    // TODO: persist pane position for user
    setStackedView(!stackedView);
  };

  const handleEditorOnChange = (code: string) => {
    console.log("CODE:::", code);
    setCode(code);
  };

  const onSaveProject = actions.handleSaveProject.bind(null, params, {
    projectTitle: "Project First",
    code,
  });

  return (
    <div className="plusjakartasans flex h-screen">
      <aside className="bg-white p-4">
        <Link href="/">
          <House />
        </Link>

        <Link href={`/project/${1}`}>
          <LayoutPanelLeft />
        </Link>
      </aside>
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

        <section className="col-span-full row-span-12">
          <Editor
            code={code}
            stacked={stackedView}
            onChange={handleEditorOnChange}
          />
        </section>
      </div>
    </div>
  );
};

export default ProjectEditor;
