import { Task, TaskStatus } from '../types/task';

export const createId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const addTaskToBacklog = (tasks: Task[], title: string): Task[] => {
  const trimmed = title.trim();
  if (!trimmed) return tasks;
  const next: Task = { id: createId(), title: trimmed, description: '', status: 'backlog' };
  return [...tasks, next];
};

/**
 * Важно для требования "добавляется последней":
 * вырезаем задачу из массива и пушим обновлённую в конец.
 */
export const moveTaskToStatus = (tasks: Task[], taskId: string, nextStatus: TaskStatus): Task[] => {
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return tasks;

  const task = tasks[idx];
  const rest = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
  return [...rest, { ...task, status: nextStatus }];
};

export const updateTaskDescription = (tasks: Task[], taskId: string, description: string): Task[] => {
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return tasks;

  const next = [...tasks];
  next[idx] = { ...next[idx], description };
  return next;
};

export const tasksByStatus = (tasks: Task[], status: TaskStatus): Task[] =>
  tasks.filter((t) => t.status === status);

export const deleteTask = (tasks: Task[], taskId: string): Task[] => {
  return tasks.filter((t) => t.id !== taskId);
};