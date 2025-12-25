import React from 'react';
import Board from '../components/Board/Board';
import { Task, TaskStatus } from '../types/task';

type Props = {
  tasks: Task[];
  onAdd: (title: string) => void;
  onMove: (taskId: string, status: TaskStatus) => void;
};

export default function HomePage({ tasks, onAdd, onMove }: Props) {
  return <Board tasks={tasks} onAdd={onAdd} onMove={onMove} />;
}