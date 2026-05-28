import { Link } from "react-router-dom";
import { deleteTask } from "../api/tasks";
import type { Task } from "../types/task";
import { StatusBadge } from "./StatusBadge";

interface TaskCardProps {
  task: Task;
  onDeleted: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onDeleted, onStatusChange }: TaskCardProps) {
  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(task.id);
      onDeleted(task.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const nextStatus = (
    status: Task["status"],
  ): { label: string; value: Task["status"] } => {
    if (status === "pending") return { label: "Start", value: "in-progress" };
    if (status === "in-progress") return { label: "Complete", value: "completed" };
    return { label: "Reopen", value: "pending" };
  };

  const handleStatusChange = async () => {
    const next = nextStatus(task.status);
    try {
      onStatusChange(task.id, next.value);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const formatDate = (d: string | null | undefined) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "—";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            to={`/edit/${task.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
          >
            {task.title}
          </Link>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
            <StatusBadge status={task.status} />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={handleStatusChange}
            className="rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
          >
            {nextStatus(task.status).label}
          </button>
          <Link
            to={`/edit/${task.id}`}
            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-red-600 ring-1 ring-inset ring-red-300 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
