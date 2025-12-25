import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Column from './Column/Column';
import { Task } from '../../../types/task';

test('Backlog: shows input on Add card and validates empty title', () => {
  const tasks: Task[] = [];
  const onAdd = jest.fn();
  const onMove = jest.fn();

  render(
    <Column title="Backlog" status="backlog" tasks={tasks} sourceTasks={[]} onAdd={onAdd} onMove={onMove} />
  );

  fireEvent.click(screen.getByRole('button', { name: /\+ Add card/i }));
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  expect(onAdd).not.toHaveBeenCalled();
  expect(screen.getByText(/Task name is required/i)).toBeInTheDocument();
});

test('Backlog: adds task when title is provided', () => {
  const tasks: Task[] = [];
  const onAdd = jest.fn();
  const onMove = jest.fn();

  render(
    <Column title="Backlog" status="backlog" tasks={tasks} sourceTasks={[]} onAdd={onAdd} onMove={onMove} />
  );

  fireEvent.click(screen.getByRole('button', { name: /\+ Add card/i }));
  fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), { target: { value: 'New Task' } });
  fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  expect(onAdd).toHaveBeenCalledWith('New Task');
});