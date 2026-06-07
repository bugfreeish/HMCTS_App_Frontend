import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { editTask, fetchTasks } from "../api/tasks";
import { TaskCard } from "../components/TaskCard";
import type { Task, TaskStatus } from "../types/task";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDeleted = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    const updated = await editTask(id, { status });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <Link
          to="/create"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          + New task
        </Link>
      </div>

      {loading && <p className="text-gray-500">Loading tasks…</p>}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
          <button onClick={load} className="ml-2 underline">Retry</button>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No tasks yet.</p>
          <Link
            to="/create"
            className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create your first task
          </Link>
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleted={handleDeleted}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
