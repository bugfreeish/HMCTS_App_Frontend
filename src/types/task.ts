export const TaskStatus = {
  Pending: "pending",
  InProgress: "in-progress",
  Complete: "completed",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
}
