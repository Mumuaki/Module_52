import React, { useMemo } from 'react';
import { Task } from '../../types/task';
import { tasksByStatus } from '../../utils/taskUtils';
import styles from './Footer.module.css';

// type Props = { tasks: Task[] };

type FooterProps = {
  active: number;
  finished: number;
  author: string;
};

export default function Footer({ active, finished, author }: FooterProps) {
  const year = new Date().getFullYear();
  //const active = useMemo(() => tasksByStatus(tasks, 'backlog').length, [tasks]);
  //const finished = useMemo(() => tasksByStatus(tasks, 'finished').length, [tasks]);

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.item}>Active tasks: {active}</span>
        <span className={styles.item}>Finished tasks: {finished}</span>
      </div>
      <div className={styles.right}>Kanban board by {author}, {year}</div>
    </footer>
  );
}