import Modal from "@/components/Modal";
import { render, screen } from "@testing-library/react";

jest.mock("lucide-react", () => ({
  X: jest.fn(),
}));

describe("Modal", () => {
  const props = {
    title: "Modal Test",
    isOpen: false,
    onClose: jest.fn(),
    children: "",
  };

  it("renders as it should", () => {
    render(<Modal {...props} isOpen={true} />);
    const modal = screen.getByText(props.title);
    expect(modal).toBeInTheDocument();
  });

  it("accepts children nodes", () => {
    render(
      <Modal {...props} isOpen={true}>
        <p>Modal content</p>
      </Modal>
    );

    const modal = screen.getByText("Modal content");
    expect(modal.innerHTML).toBe("Modal content");
  });
});
