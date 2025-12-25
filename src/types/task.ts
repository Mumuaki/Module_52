export type TaskStatus = 'backlog' | 'ready' | 'inProgress' | 'finished';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export const STATUS_TITLES: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  ready: 'Ready',
  inProgress: 'In progress',
  finished: 'Finished',
};

export const STATUS_ORDER: TaskStatus[] = ['backlog', 'ready', 'inProgress', 'finished'];

export const PREV_STATUS: Record<Exclude<TaskStatus, 'backlog'>, TaskStatus> = {
  ready: 'backlog',
  inProgress: 'ready',
  finished: 'inProgress',
};