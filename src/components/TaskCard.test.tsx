import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

jest.mock("../api/tasks", () => ({
  deleteTask: jest.fn(),
}));

jest.mock("./StatusBadge", () => ({
  StatusBadge: () => <span data-testid="status-badge" />,
}));

const baseTask: Task = {
  id: "1",
  title: "Test Task",
  description: "A description",
  status: "pending",
  dueDate: "2026-06-15T10:00:00Z",
  createdAt: "2026-05-01T10:00:00Z",
  updatedAt: "2026-05-01T10:00:00Z",
};

const noop = () => {};

function renderCard(task: Task = baseTask) {
  return render(
    <MemoryRouter>
      <TaskCard task={task} onDeleted={noop} onStatusChange={noop} />
    </MemoryRouter>,
  );
}

it("renders the task title as a link", () => {
  renderCard();
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

it("renders the description when provided", () => {
  renderCard();
  expect(screen.getByText("A description")).toBeInTheDocument();
});

it("does not render description when null", () => {
  renderCard({ ...baseTask, description: null });
  expect(screen.queryByText("A description")).not.toBeInTheDocument();
});

it("does not render description when undefined", () => {
  renderCard({ ...baseTask, description: undefined });
  expect(screen.queryByText("A description")).not.toBeInTheDocument();
});

it("renders the status badge", () => {
  renderCard();
  expect(screen.getByTestId("status-badge")).toBeInTheDocument();
});

it("renders the formatted due date", () => {
  renderCard();
  expect(screen.getByText(/15 Jun 2026/)).toBeInTheDocument();
});

it("renders em dash when due date is null", () => {
  renderCard({ ...baseTask, dueDate: null });
  expect(screen.getByText((c) => c.includes("—"))).toBeInTheDocument();
});

it("renders em dash when due date is undefined", () => {
  renderCard({ ...baseTask, dueDate: undefined });
  expect(screen.getByText((c) => c.includes("—"))).toBeInTheDocument();
});
