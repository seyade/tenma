import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Braces, View } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type CodeEditorProps = {
  code?: string;
  direction?: "horizontal" | "vertical";
  onChange?: (code: any, e: any) => void;
};

const CodeEditor = ({
  code,
  direction = "horizontal",
  onChange,
}: CodeEditorProps) => {
  const [editorEode, setEditorCode] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const generatePreviewTemplate = (componentCode: any) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset='UTF-8'>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${componentCode}

          try {
            const root = ReactDOM.createRoot(document.querySelector("#root"));
            root.render(<App />);
          } catch (error) {
            <div>
              document.querySelector("#root").innerHTML = "<p>Error:" + error.message + "</p>";
            </div>
          }
          
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    if (iframeRef.current) {
      const previewContent = generatePreviewTemplate(editorEode);
      iframeRef.current.srcdoc = previewContent;
    }
  }, [editorEode]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setEditorCode(value);
  };

  return (
    <div className="mb-2 rounded-md bg-slate-50 overflow-hidden h-[calc(100vh-64px)]">
      <ResizablePanelGroup direction={direction}>
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full">
            <div className="flex items-center py-2 px-3 bg-zinc-800 text-sm text-white">
              <span className="mr-2">Code</span>
              <Braces size={18} />
            </div>
            <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue={defaultEditorCode}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex items-center py-[6px] px-3 bg-zinc-0 text-sm text-slate-900 border-b">
            <span className="mr-2">Preview</span> <View />
          </div>
          <div className="h-full bg-slate-200 p-2">
            <iframe
              ref={iframeRef}
              className="h-full w-full bg-white rounded-lg shadow-sm"
              title="Preview"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeEditor;
