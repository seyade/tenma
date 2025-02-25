import React from "react";
import { render, screen } from "@testing-library/react";
import AppHeader from "@/components/AppHeader";

jest.mock("lucide-react", () => ({
  Bell: jest.fn(),
  Search: jest.fn(),
  Settings: jest.fn(),
}));

describe("AppHeader", () => {
  const props = {
    pageTitle: "App Header",
    pathName: "/project",
  };
  it("renders properly with correct title", () => {
    render(<AppHeader {...props} />);
    const appHeader = screen.getByText("App Header");
    expect(appHeader).toBeInTheDocument();
  });
});
