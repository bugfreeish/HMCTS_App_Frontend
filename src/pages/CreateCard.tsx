import { useNavigate } from "react-router-dom";
import { createTask } from "../api/tasks";
import { TaskForm } from "../components/TaskForm";
import type { CreateTaskRequest } from "../types/task";

export function CreateTask(): React.ReactElement {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateTaskRequest) => {
    await createTask(data);
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New task</h1>
      <TaskForm onSubmit={handleSubmit} submitLabel="Create task" />
    </div>
  );
}
