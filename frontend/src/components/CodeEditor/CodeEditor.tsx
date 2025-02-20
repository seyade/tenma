import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
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

  const defaultEditorCode = `function App() {
  return <div>Welcome to React</div>
}`;

  const generatePreviewTemplate = (componentCode: any) => `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset='UTF-8'>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${componentCode}

          const root = ReactDOM.createRoot(document.getElementById("root"));
          root.render(<App />);
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
    <div className="mb-2 rounded-md bg-slate-50 overflow-hidden">
      <ResizablePanelGroup
        direction={direction}
        className="h-[calc(100vh-64px)]"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full">
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
          <div className="h-full bg-slate-50 p-4">
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
