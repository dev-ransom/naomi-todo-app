import { useState } from "react";
import { Priority } from "../types/task";
import DateTimePicker from "./DateTimePicker";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    deadline: Date;
    priority: Priority;
  }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;

    onSubmit({
      title,
      description,
      deadline: new Date(deadline),
      priority,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDeadline(new Date());
    setPriority("medium");
  };

  // Mobile-friendly date input
  const getDateInputType = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "datetime-local" : "datetime-local";
    }
    return "datetime-local";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Task Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          required
          placeholder="e.g. Math homework"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          rows={3}
          placeholder="Add details about your task..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Deadline *
          </label>
          <DateTimePicker
            selected={deadline}
            onChange={setDeadline}
            minDate={new Date()}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPriority("low")}
              className={`py-2 px-1 rounded-lg text-sm font-medium ${
                priority === "low"
                  ? "bg-green-100 text-green-800 border-2 border-green-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => setPriority("medium")}
              className={`py-2 px-1 rounded-lg text-sm font-medium ${
                priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setPriority("high")}
              className={`py-2 px-1 rounded-lg text-sm font-medium ${
                priority === "high"
                  ? "bg-red-100 text-red-800 border-2 border-red-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              High
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-base"
      >
        Add Task
      </button>
    </form>
  );
}
