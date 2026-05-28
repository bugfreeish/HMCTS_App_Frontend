import { fireEvent, render, screen } from "@testing-library/react";
import { TaskForm } from "./TaskForm";

const onSubmit = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

it("renders title, description, and due date fields", () => {
  render(<TaskForm onSubmit={onSubmit} />);
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
});

it("shows error when submitting with empty title", async () => {
  render(<TaskForm onSubmit={onSubmit} />);
  screen.getByRole("button", { name: "Save" }).click();
  expect(await screen.findByText("Title is required")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("calls onSubmit with form data on valid submission", async () => {
  onSubmit.mockResolvedValue(undefined);
  render(<TaskForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Test task" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));

  await screen.findByRole("button", { name: "Save" });
  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ title: "Test task" }),
  );
});

it("renders custom submit label", () => {
  render(<TaskForm onSubmit={onSubmit} submitLabel="Create" />);
  expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
});

it("disables button while submitting", async () => {
  onSubmit.mockReturnValue(new Promise(() => {}));
  render(<TaskForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Task" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));

  expect(await screen.findByRole("button", { name: /saving/i })).toBeDisabled();
});

it("shows error message when onSubmit throws", async () => {
  onSubmit.mockRejectedValue(new Error("Server error"));
  render(<TaskForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "Task" } });
  fireEvent.click(screen.getByRole("button", { name: "Save" }));

  expect(await screen.findByText("Server error")).toBeInTheDocument();
});
