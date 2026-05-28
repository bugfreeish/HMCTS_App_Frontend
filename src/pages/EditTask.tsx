import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, fetchTask, updateTaskStatus } from "../api/tasks";
import { StatusBadge } from "../components/StatusBadge";
import type { Task, TaskStatus } from "../types/task";

const statuses: TaskStatus[] = ["pending", "in-progress", "completed"];

export function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchTask(id)
      .then(setTask)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load task"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: TaskStatus) => {
    if (!id) return;
    setSaving(true);
    try {
      const updated = await updateTaskStatus(id, { status });
      console.log(updated, "updated task");
      setTask(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      navigate("/");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const formatDate = (d: string | null | undefined) =>
    d
      ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      : "Not set";

  if (loading) return <p className="text-gray-500">Loading task…</p>;
  if (error) return <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">{error}</div>;
  if (!task) return <p className="text-gray-500">Task not found.</p>;

  return (
    <div className="mx-auto max-w-lg">
      <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-500">&larr; Back to tasks</Link>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>

        {task.description && <p className="mt-3 text-gray-600">{task.description}</p>}

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Due date</dt>
            <dd className="text-gray-900">{formatDate(task.dueDate)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-900">{formatDate(task.createdAt)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Updated</dt>
            <dd className="text-gray-900">{formatDate(task.updatedAt)}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <div className="mt-2 flex gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                disabled={saving}
                onClick={() => handleStatusChange(s)}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  task.status === s
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50`}
              >
                {s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
