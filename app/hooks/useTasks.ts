'use client'
import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { isDueSoon } from '../utils/dateUtils';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('student-tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          deadline: new Date(task.deadline),
          createdAt: new Date(task.createdAt)
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Failed to parse saved tasks', error);
      }
    }
  }, []);

  useEffect(() => {
    // Check for due tasks every minute
    const interval = setInterval(() => {
      const now = new Date();
      const newReminders = tasks
        .filter(task => !task.completed && isDueSoon(task.deadline))
        .map(task => `${task.title} is due soon!`);

      if (newReminders.length > 0) {
        setReminders(prev => [...prev, ...newReminders]);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      completed: false
    };

    setTasks(prev => {
      const updatedTasks = [...prev, newTask];
      localStorage.setItem('student-tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => {
      const updatedTasks = prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('student-tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => {
      const updatedTasks = prev.filter(task => task.id !== id);
      localStorage.setItem('student-tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return { tasks, reminders, addTask, toggleTaskCompletion, deleteTask };
};