import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "./Home";

jest.mock("../api/tasks", () => ({
  fetchTasks: jest.fn(),
  updateTaskStatus: jest.fn(),
}));

const { fetchTasks } = jest.requireMock("../api/tasks") as {
  fetchTasks: jest.Mock;
};

beforeEach(() => {
  jest.clearAllMocks();
});

it("shows loading initially", () => {
  fetchTasks.mockReturnValue(new Promise(() => {}));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(screen.getByText("Loading tasks…")).toBeInTheDocument();
});

it("shows error message on failure", async () => {
  fetchTasks.mockRejectedValue(new Error("Network error"));
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(await screen.findByText("Network error")).toBeInTheDocument();
});

it("renders task titles", async () => {
  fetchTasks.mockResolvedValue([
    { id: "1", title: "Task one", status: "pending", createdAt: "", updatedAt: "" },
    { id: "2", title: "Task two", status: "done", createdAt: "", updatedAt: "" },
  ]);
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(await screen.findByText("Task one")).toBeInTheDocument();
  expect(screen.getByText("Task two")).toBeInTheDocument();
});

it("shows empty state when no tasks", async () => {
  fetchTasks.mockResolvedValue([]);
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(await screen.findByText("No tasks yet.")).toBeInTheDocument();
});
