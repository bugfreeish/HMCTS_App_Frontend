import { fireEvent, render, screen } from "@testing-library/react";
import { InlineEdit } from "./InlineEdit";

const onSave = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it("renders the value in display mode", () => {
  render(<InlineEdit value="Hello" onSave={onSave} />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

it("renders placeholder when value is empty", () => {
  render(<InlineEdit value="" onSave={onSave} placeholder="Add something..." />);
  expect(screen.getByText("Add something...")).toBeInTheDocument();
});

it("renders default placeholder when value is empty and no placeholder given", () => {
  render(<InlineEdit value="" onSave={onSave} />);
  expect(screen.getByText("Click to edit...")).toBeInTheDocument();
});

it("enters edit mode on click", () => {
  render(<InlineEdit value="Hello" onSave={onSave} />);
  fireEvent.click(screen.getByText("Hello"));
  expect(screen.getByRole("textbox")).toHaveValue("Hello");
  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
});

it("calls onSave with the new value when Save is clicked", () => {
  render(<InlineEdit value="Hello" onSave={onSave} />);
  fireEvent.click(screen.getByText("Hello"));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Updated" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(onSave).toHaveBeenCalledWith("Updated");
});

it("calls onSave when Enter is pressed in single-line mode", () => {
  render(<InlineEdit value="Hello" onSave={onSave} />);
  fireEvent.click(screen.getByText("Hello"));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Updated" } });
  fireEvent.keyDown(input, { key: "Enter" });
  expect(onSave).toHaveBeenCalledWith("Updated");
});

it("does not call onSave when Enter is pressed in multiline mode", () => {
  render(<InlineEdit value="Hello" onSave={onSave} multiline />);
  fireEvent.click(screen.getByText("Hello"));
  const textarea = screen.getByRole("textbox");
  fireEvent.change(textarea, { target: { value: "Updated" } });
  fireEvent.keyDown(textarea, { key: "Enter" });
  expect(onSave).not.toHaveBeenCalled();
});

it("returns to display mode after Save", () => {
  render(<InlineEdit value="Hello" onSave={onSave} />);
  fireEvent.click(screen.getByText("Hello"));
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

it("reverts to the original value when Cancel is clicked", () => {
  render(<InlineEdit value="Original" onSave={onSave} />);
  fireEvent.click(screen.getByText("Original"));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Changed" } });
  fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(screen.getByText("Original")).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();
});

it("reverts to the original value when Escape is pressed", () => {
  render(<InlineEdit value="Original" onSave={onSave} />);
  fireEvent.click(screen.getByText("Original"));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Changed" } });
  fireEvent.keyDown(input, { key: "Escape" });
  expect(screen.getByText("Original")).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();
});

it("renders a textarea when multiline is true", () => {
  render(<InlineEdit value="Line 1\nLine 2" onSave={onSave} multiline />);
  fireEvent.click(screen.getByText(/Line 1/));
  const textarea = screen.getByRole("textbox");
  expect(textarea.tagName).toBe("TEXTAREA");
});

it("displays displayClassName on the display element", () => {
  render(<InlineEdit value="Styled" onSave={onSave} displayClassName="text-2xl font-bold" />);
  const display = screen.getByText("Styled").closest("div");
  expect(display?.className).toContain("text-2xl");
});

it("applies the correct value to the input on re-entry after cancel", () => {
  const { rerender } = render(<InlineEdit value="First" onSave={onSave} />);
  fireEvent.click(screen.getByText("First"));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Changed" } });
  fireEvent.keyDown(input, { key: "Escape" });

  rerender(<InlineEdit value="Second" onSave={onSave} />);
  fireEvent.click(screen.getByText("Second"));
  expect(screen.getByRole("textbox")).toHaveValue("Second");
});
