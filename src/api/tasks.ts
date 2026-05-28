import type { Task } from "../types/task";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/tasks");
  return handleResponse<Task[]>(res);
}
