import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatDate";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDeleted?: (id: string) => void;
  onStatusChange?: (id: string, status: Task["status"]) => void;
}

export function TaskCard({ task }: TaskCardProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Link
            // Provisionally linked to home
            to={`/`}
            className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
          >
            {task.title}
          </Link>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-700 line-clamp-2">
            {task.status}
          </p>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>
    </div>
  );
}
