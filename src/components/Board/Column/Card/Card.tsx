import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../../../types/task';
import styles from './Card.module.css';

type Props = { task: Task };

export default function Card({ task }: Props) {
  return (
    <Link to={`/tasks/${task.id}`} className={styles.card}>
      <span className={styles.title}>{task.title}</span>
    </Link>
  );
}
