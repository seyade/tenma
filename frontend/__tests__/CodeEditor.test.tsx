import React from "react";
import { render, screen } from "@testing-library/react";
import CodeEditor from "@/components/CodeEditor/CodeEditor";

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
  const props = {
    onChange: jest.fn(),
    direction: "horizontal" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be rendered", () => {
    render(<CodeEditor {...props} />);
    expect(screen.getByTestId("monaco-editor")).toBeInTheDocument();
  });
});
