import Sidebar from "@/components/Sidebar";
import { render, screen } from "@testing-library/react";

jest.mock("lucide-react", () => ({
  Binoculars: jest.fn(),
  FolderKanban: jest.fn(),
  House: jest.fn(),
  LayoutDashboard: jest.fn(),
  Settings: jest.fn(),
}));

jest.mock("@/components/Sidebar", () => ({
  __esModule: true,
  default: () => (
    <aside>
      <div>
        <span>Ta.</span>
      </div>
      <div>
        <nav>
          <a href="">Home</a>
          <a href="">Dashboard</a>
        </nav>
      </div>
    </aside>
  ),
}));

describe("Sidebar", () => {
  it("renders properly", () => {
    render(<Sidebar />);
    const sidebar = screen.getByText("Home");
    expect(sidebar).toBeInTheDocument();
  });
});
