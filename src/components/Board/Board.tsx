import React, { useMemo } from 'react';
import { Task, TaskStatus, STATUS_ORDER, STATUS_TITLES, PREV_STATUS } from '../../types/task';
import { tasksByStatus } from '../../utils/taskUtils';
import Column from './Column/Column/Column';
import styles from './Board.module.css';

type Props = {
  tasks: Task[];
  onAdd: (title: string) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
};

export default function Board({ tasks, onAdd, onMove }: Props) {
  const grouped = useMemo(() => {
    return {
      backlog: tasksByStatus(tasks, 'backlog'),
      ready: tasksByStatus(tasks, 'ready'),
      inProgress: tasksByStatus(tasks, 'inProgress'),
      finished: tasksByStatus(tasks, 'finished'),
    };
  }, [tasks]);

  return (
    <section className={styles.board} aria-label="Kanban board">
      {STATUS_ORDER.map((status) => {
        const prevStatus = status === 'backlog' ? null : PREV_STATUS[status];
        const sourceTasks = prevStatus ? grouped[prevStatus] : [];

        return (
          <Column
            key={status}
            title={STATUS_TITLES[status]}
            status={status}
            tasks={grouped[status]}
            sourceTasks={sourceTasks}
            onAdd={onAdd}
            onMove={onMove}
          />
        );
      })}
    </section>
  );
}