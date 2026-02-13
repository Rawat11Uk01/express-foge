export type TaskType =
  | "work"
  | "personal"
  | "study"
  | "health"
  | "finance"
  | "shopping"
  | "meeting"
  | "other";

export type Task = {
  id: number;
  name: string;
  date: string;
  deadline: string;
  type: TaskType;
};
