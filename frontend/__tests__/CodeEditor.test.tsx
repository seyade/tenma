import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { Code } from "lucide-react";

jest.mock("@/components/ui/resizable", () => ({
  ResizablePanelGroup: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ResizablePanel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ResizableHandle: () => <div>handle</div>,
}));

jest.mock("lucide-react", () => ({
  Braces: () => <div>Brace</div>,
  View: () => <div>View</div>,
}));

jest.mock("@monaco-editor/react", () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
  }: {
    onChange: (value: string) => void;
    value: string;
  }) => (
    <div data-testid="monaco-editor">
      <textarea
        data-testid="mock-editor-area"
        onChange={(e: any) => onChange(e.target.value)}
        value={value}
      />
    </div>
  ),
}));

describe("CodeEditor", () => {
  const editorProps = {
    // code: "<p>Default code</p>",
    onChange: jest.fn(),
    direction: "horizontal" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    render(<CodeEditor {...editorProps} />);
    const editor = screen.getByTestId("monaco-editor");
    const iframe = screen.getByTitle("Preview");
    expect(editor).toBeInTheDocument();
    expect(iframe).toBeInTheDocument();
  });

  it("triggers onChange on code change", () => {
    render(<CodeEditor {...editorProps} />);
    const textarea = screen.getByTestId("mock-editor-area");
    fireEvent.change(textarea, {
      target: { value: "function Test() { return <div>Test</div>; }" },
    });
    expect(editorProps.onChange).toHaveBeenCalled();
  });

  it("updates preview panel when code changed", () => {
    const { rerender } = render(<CodeEditor {...editorProps} />);
    const textarea = screen.getByTestId("mock-editor-area");
    const iframe: HTMLIFrameElement = screen.getByTitle("Preview");
    const initialDoc = iframe.srcdoc;

    rerender(
      <CodeEditor
        {...editorProps}
        code="function Preview() { return <div>Preview</div>; }"
      />
    );
    expect(iframe.srcdoc).not.toBe(initialDoc);
  });

  it("correctly extracts component name from arrow function", () => {
    const code = "const MyComponent = () => <div>Hello</div>;";
    render(<CodeEditor code={code} />);
    const iframe: HTMLIFrameElement = screen.getByTitle("Preview");
    expect(iframe.srcdoc).toContain("MyComponent");
  });

  it("correctly extracts component name from function declaration", () => {
    const code = "function MyComponent() { return <div>Hello</div>; }";
    render(<CodeEditor code={code} />);
    const iframe: HTMLIFrameElement = screen.getByTitle("Preview");
    expect(iframe.srcdoc).toContain("MyComponent");
  });
});
