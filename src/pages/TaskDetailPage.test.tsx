import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../types/task';
import styles from './TaskDetailPage.module.css';

type Props = {
  tasks: Task[];
  onUpdateDescription: (taskId: string, description: string) => void;
};

export default function TaskDetailPage({ tasks, onUpdateDescription }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = useMemo(
    () => tasks.find((t) => t.id === id),
    [tasks, id]
  );

  if (!task) {
    return (
      <section className={styles.notFound}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.close}
        >
          ✕
        </button>
        <h1>Task not found</h1>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{task.title}</h1>

          <button
            type="button"
            onClick={() => navigate('/')}
            className={styles.close}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <div className={styles.label}>Description</div>

        <textarea
          className={styles.textarea}
          value={task.description}
          onChange={(e) =>
            onUpdateDescription(task.id, e.currentTarget.value)
          }
          placeholder="This task has no description"
        />

        {!task.description.trim() && (
          <div className={styles.hint}>
            This task has no description
          </div>
        )}
      </div>
    </section>
  );
}

