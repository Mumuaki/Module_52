import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import { Task } from './types/task';
import {
  addTaskToBacklog,
  moveTaskToStatus,
  updateTaskDescription,
  deleteTask,
} from './utils/taskUtils';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';

import globalStyles from './styles/globals.module.css';

const STORAGE_KEY = 'kanban:tasks:v1';

const initialMockTasks: Task[] = [
  { id: 't-1', title: 'Define requirements', description: '', status: 'backlog' },
  { id: 't-2', title: 'Setup project', description: 'CRA + TS', status: 'ready' },
  { id: 't-3', title: 'Implement board UI', description: '', status: 'inProgress' },
  { id: 't-4', title: 'Ship to prod', description: 'Celebrate responsibly.', status: 'finished' },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, initialMockTasks);

  const actions = useMemo(() => {
    return {
      addToBacklog: (title: string) =>
        setTasks((prev) => addTaskToBacklog(prev, title)),

      moveTo: (taskId: string, status: Task['status']) =>
        setTasks((prev) => moveTaskToStatus(prev, taskId, status)),

      updateDescription: (taskId: string, description: string) =>
        setTasks((prev) => updateTaskDescription(prev, taskId, description)),

      deleteTask: (taskId: string) =>
        setTasks((prev) => deleteTask(prev, taskId)),
    };
  }, [setTasks]);

  // ✅ COUNT TASKS HERE (this was missing)
  const activeCount = tasks.filter(
    (t) => t.status !== 'finished'
  ).length;

  const finishedCount = tasks.filter(
    (t) => t.status === 'finished'
  ).length;

  return (
    <div className={globalStyles.app}>
      <Header />

      <main className={globalStyles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tasks={tasks}
                onAdd={actions.addToBacklog}
                onMove={actions.moveTo}
              />
            }
          />

          <Route
            path="/tasks/:id"
            element={
              <TaskDetailPage
                tasks={tasks}
                onUpdateDescription={actions.updateDescription}
                onDelete={actions.deleteTask}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ✅ PASS CORRECT PROPS */}
      <Footer
        active={activeCount}
        finished={finishedCount}
        author="Your Name"
      />
    </div>
  );
}
