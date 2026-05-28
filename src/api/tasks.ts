import type { CreateTaskRequest, Task } from "../types/task";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const res = await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Task>(res);
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/tasks");
  return handleResponse<Task[]>(res);
}
