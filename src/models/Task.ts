import type { TaskStrategy } from './TaskStrategy';


export abstract class Task {
    name: string;
    isComplete: boolean;
    strategy: TaskStrategy | null;

    protected constructor(name: string, strategy: TaskStrategy | null = null) {
        this.name = name;
        this.isComplete = false;
        this.strategy = strategy;
    }

    markComplete(): void {
        this.isComplete = true;
        console.log(`Task "${this.name}" is now marked as completed.`);
    }

    abstract execute(): void;

    addSubTask(task: Task): void {
        throw new Error(`Cannot add subtasks to a simple task: "${task.name}"`);
    }

    removeSubTask(taskName: string): void {
        throw new Error(`Cannot remove subtasks from a simple task: "${taskName}"`);
    }
}
