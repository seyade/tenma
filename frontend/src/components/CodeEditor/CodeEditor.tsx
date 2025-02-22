import React, { useEffect, useRef } from "react";
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const extractComponentName = (code: string): string => {
    const arrowMatch = code?.match(/const\s+([A-Z][a-zA-Z0-9]*)\s*=/);
    const funcMatch = code?.match(/function\s+([A-Z][a-zA-Z0-9]*)\s*\(/);
    return arrowMatch?.[1] || funcMatch?.[1] || "App";
  };

  const generatePreviewTemplate = (componentCode: any) => {
    const componenName = extractComponentName(componentCode);

    return `
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
              root.render(<${componenName} />);
            } catch (error) {
              <div>
                document.querySelector("#root").innerHTML = "<p>Error:" + error.message + "</p>";
              </div>
            }
            
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    if (iframeRef.current) {
      const previewContent = generatePreviewTemplate(code);
      iframeRef.current.srcdoc = previewContent;
    }
  }, [code]);

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
              defaultValue={code}
              onChange={onChange}
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
