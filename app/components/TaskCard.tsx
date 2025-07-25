import { Task } from "../types/task";
import { isDueSoon } from "../utils/dateUtils";
import CountdownTimer from "./CountDowntimer";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const isUrgent = isDueSoon(task.deadline) && !task.completed;

  return (
    <div
      className={`border rounded-lg p-3 mb-3 transition-all duration-200 ${
        task.completed ? "bg-gray-50" : "bg-white"
      } ${isUrgent ? "border-red-300 border-2" : "border-gray-200"}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center flex-1 min-w-0">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="flex-shrink-0 h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none"
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed && (
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
          <div className="ml-3 min-w-0">
            <h3
              className={`text-base font-semibold truncate ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 mt-1 text-sm whitespace-pre-line break-words">
                {task.description}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority} priority
        </span>
        <CountdownTimer
          deadline={task.deadline}
          className={isUrgent ? "animate-pulse text-sm" : "text-sm"}
        />
      </div>
    </div>
  );
}
