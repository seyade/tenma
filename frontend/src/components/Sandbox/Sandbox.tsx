"use client";

import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

type SandboxProps = {
  id: string;
  code: string;
  stacked?: boolean;
};

const Sandbox = ({ id = "1", code, stacked }: SandboxProps) => {
  return (
    <LiveProvider code={code} enableTypeScript>
      <div className={`flex ${stacked ? "flex-col" : ""} gap-2 h-screen`}>
        <LiveEditor
          className="h-full w-full text-sm font-mono bg-[#011627]"
          tabMode="indentation"
        />
        <LivePreview className="h-full w-full bg-white border border-slate-400" />
        <LiveError className="text-red-800 text-sm p-3 bg-red-200" />
      </div>
    </LiveProvider>
  );
};

export default Sandbox;
