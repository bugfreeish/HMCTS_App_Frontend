import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

jest.mock("../api/tasks", () => ({
  fetchTasks: jest.fn(),
}));

const { fetchTasks } = jest.requireMock("../api/tasks") as {
  fetchTasks: jest.Mock;
};

beforeEach(() => {
  jest.clearAllMocks();
});

it("shows loading initially", () => {
  fetchTasks.mockReturnValue(new Promise(() => {}));
  render(<Home />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("shows error message on failure", async () => {
  fetchTasks.mockRejectedValue(new Error("Network error"));
  render(<Home />);
  expect(await screen.findByText("Network error")).toBeInTheDocument();
});

it("renders task titles", async () => {
  fetchTasks.mockResolvedValue([
    { id: "1", title: "Task one", status: "pending", createdAt: "", updatedAt: "" },
    { id: "2", title: "Task two", status: "done", createdAt: "", updatedAt: "" },
  ]);
  render(<Home />);
  expect(await screen.findByText("Task one")).toBeInTheDocument();
  expect(screen.getByText("Task two")).toBeInTheDocument();
});

it("shows empty state when no tasks", async () => {
  fetchTasks.mockResolvedValue([]);
  render(<Home />);
  expect(await screen.findByText("No tasks yet")).toBeInTheDocument();
});
