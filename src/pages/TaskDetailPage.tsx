import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../types/task';
import styles from './TaskDetailPage.module.css';

type Props = {
  tasks: Task[];
  onUpdateDescription: (taskId: string, description: string) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskDetailPage({
  tasks,
  onUpdateDescription,
  onDelete,
}: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const task = useMemo(
    () => tasks.find((t) => t.id === id),
    [tasks, id]
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (task) {
      onDelete(task.id);
      navigate('/');
    }
  };

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

        {/* VIEW MODE (pixel-perfect) */}
        {!isEditing && (
          <div className={styles.content} onClick={() => setIsEditing(true)}>
            {task.description || 'This task has no description'}
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <textarea
            className={styles.textarea}
            value={task.description}
            autoFocus
            onChange={(e) =>
              onUpdateDescription(task.id, e.currentTarget.value)
            }
            onBlur={() => setIsEditing(false)}
            placeholder="This task has no description"
          />
        )}

        {task.status === 'backlog' && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            Delete Task
          </button>
        )}
      </div>
    </section>
  );
}
