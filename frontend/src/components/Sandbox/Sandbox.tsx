"use client";

import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";

type SandboxProps = {
  id: string;
  code: string;
  stacked?: boolean;
  onChange?: (value: string) => void;
};

const Sandbox = ({ id = "1", code, stacked, onChange }: SandboxProps) => {
  return (
    <div className="h-full">
      <LiveProvider code={code} enableTypeScript>
        <div className={`flex ${stacked ? "flex-col" : ""} gap-2 h-full`}>
          <LiveEditor
            className="h-full w-full text-sm font-mono bg-[#011627]"
            tabMode="indentation"
            onChange={onChange}
          />
          <LivePreview className="h-full w-full bg-white border border-slate-400" />
          <LiveError className="text-red-800 text-sm p-3 bg-red-200" />
        </div>
      </LiveProvider>
    </div>
  );
};

export default Sandbox;
