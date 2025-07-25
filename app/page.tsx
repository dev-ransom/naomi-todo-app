'use client'
import { useState } from "react";
import Head from "next/head";
import { useTasks } from "./hooks/useTasks";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

export default function Home() {
  const { tasks, reminders, addTask, toggleTaskCompletion, deleteTask } =
    useTasks();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all"
  );

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "active") return !task.completed;
    if (activeTab === "completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return a.deadline.getTime() - b.deadline.getTime();
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Student Task Manager</title>
        <meta name="description" content="A simple task manager for students" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Task Manager
        </h1>

        <div className="max-w-3xl mx-auto">
          {/* Reminders */}
          {reminders.length > 0 && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Reminders
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {reminders.map((reminder, index) => (
                        <li key={index}>{reminder}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task Form */}
          <div className="mb-8">
            <TaskForm onSubmit={addTask} />
          </div>

          {/* Task List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "active"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === "completed"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Completed
                </button>
              </nav>
            </div>

            {/* Tasks */}
            <div className="p-4">
              {sortedTasks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No tasks found. Add a new task to get started!
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleComplete={toggleTaskCompletion}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
