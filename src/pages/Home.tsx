import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../types/task";

export function Home(): React.ReactElement {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (tasks.length === 0) return <div>No tasks yet</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="space-y-3">
            {tasks.map((task) => {
              return <TaskCard task={task} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
