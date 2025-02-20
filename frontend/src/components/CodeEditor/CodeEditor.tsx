import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type CodeEditorProps = {
  code?: string;
  direction?: "horizontal" | "vertical";
  onChange: (code: any, e: any) => void;
};

const CodeEditor = ({
  code,
  direction = "horizontal",
  onChange,
}: CodeEditorProps) => {
  const iframeRef = useRef<any>(null);

  const defaultEditorCode = `function MyComponet() {
    return <div>Welcome to React</div>
  }
`;

  const handleEditorChange = (value: any) => {
    const iframe = iframeRef.current;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>  
    `);
    iframeDoc.close();

    try {
      const transpiledCode = Babel.transform(value || "", {
        presets: ["react"],
      }).code;

      const fullCode = `
        ReactDOM.render(
          React.createElement(MyComponent), document.getElementById("root")
        );
      `;

      const script = iframeDoc.createElement("script");
      script.textContent = fullCode;
      iframeDoc.body.document.appendChild(script);
    } catch (error: any) {
      console.log("IFRAME_PREVIEW_ERROR: ", error);
    }
  };

  return (
    <div className="mb-2 rounded-md bg-slate-900 overflow-hidden">
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
              defaultValue="// Start coding here"
              onChange={onChange}
              options={{ minimap: { enabled: false } }}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          {/* <div className="rounded-md bg-slate-900 overflow-hidden h-full"> */}
          <div className="h-full bg-slate-400 p-4">
            <iframe
              ref={iframeRef}
              className="h-full w-full"
              title="Preview"
              sandbox="allow-modals allow-scripts"
              srcDoc=""
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeEditor;
