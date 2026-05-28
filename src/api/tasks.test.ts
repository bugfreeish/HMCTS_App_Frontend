import { fetchTasks } from "./tasks";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("fetchTasks", () => {
  it("calls /tasks and returns parsed tasks", async () => {
    const tasks = [
      { id: "1", title: "Test task", status: "pending", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    ];

    mockFetch(200, tasks);

    const result = await fetchTasks();
    expect(result).toEqual(tasks);
    expect(global.fetch).toHaveBeenCalledWith("/tasks");
  });

  it("throws on non-ok response with error message", async () => {
    mockFetch(400, { error: "Bad request" });

    await expect(fetchTasks()).rejects.toThrow("Bad request");
  });

  it("throws with status code when no error message", async () => {
    mockFetch(500, {});

    await expect(fetchTasks()).rejects.toThrow("Request failed with status 500");
  });

  it("throws on invalid JSON in error response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: jest.fn().mockRejectedValue(new SyntaxError("Unexpected token")),
    });

    await expect(fetchTasks()).rejects.toThrow("Request failed with status 400");
  });

  it("returns undefined on 204", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
      json: jest.fn().mockRejectedValue(new Error("No content")),
    });

    const result = await fetchTasks();
    expect(result).toBeUndefined();
  });
});

function mockFetch(status: number, body: unknown) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(body),
  });
}
