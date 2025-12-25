import React, { useMemo, useState } from 'react';
import { Task, TaskStatus, PREV_STATUS } from '../../../../types/task';
import Card from '../Card/Card';
import styles from './Column.module.css';

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  sourceTasks: Task[]; // задачи из предыдущей колонки для select
  onAdd: (title: string) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
};

export default function Column({ title, status, tasks, sourceTasks, onAdd, onMove }: Props) {
  const [adding, setAdding] = useState(false);

  // backlog input
  const [draftTitle, setDraftTitle] = useState('');
  const [error, setError] = useState<string>('');

  // select state
  const [selectedId, setSelectedId] = useState('');

  const isBacklog = status === 'backlog';
  const isMoveColumn = !isBacklog;

  const isButtonDisabled = useMemo(() => {
    if (isBacklog) return false;
    return sourceTasks.length === 0;
  }, [isBacklog, sourceTasks.length]);

  const buttonLabel = useMemo(() => {
    if (!adding) return '+ Add card';
    return 'Submit';
  }, [adding]);

  const handleButtonClick = () => {
    if (isButtonDisabled) return;

    if (!adding) {
      setAdding(true);
      setError('');
      return;
    }

    // Submit state
    if (isBacklog) {
      if (!draftTitle.trim()) {
        setError('Task name is required');
        return;
      }
      onAdd(draftTitle);
      setDraftTitle('');
      setAdding(false);
      setError('');
      return;
    }

    // move columns: submit does nothing, move happens on select
    setAdding(false);
    setSelectedId('');
  };

  const handleSelect = (taskId: string) => {
    if (!taskId) return;
    onMove(taskId, status);
    setSelectedId('');
    setAdding(false);
  };

  return (
    <section className={styles.column} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.list}>
        {tasks.map((t) => (
          <Card key={t.id} task={t} />
        ))}

        {adding && isBacklog && (
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.currentTarget.value)}
              placeholder="Enter task title"
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>
        )}

        {adding && isMoveColumn && (
          <div className={styles.selectRow}>
            <select
              className={styles.select}
              value={selectedId}
              onChange={(e) => {
                const v = e.currentTarget.value;
                setSelectedId(v);
                handleSelect(v);
              }}
            >
              <option value="" disabled>
                Select task
              </option>
              {sourceTasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>

            {/* Подсказка: откуда берём задачи */}
            <div className={styles.hint}>
              from {isMoveColumn ? PREV_STATUS[status as Exclude<TaskStatus, 'backlog'>] : ''}
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className={isButtonDisabled ? styles.addButtonDisabled : styles.addButton}
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        {buttonLabel}
      </button>
    </section>
  );
}