import type { Task } from "./Task.ts";

export interface TaskStrategy {
    execute(task: Task): void;
}
