import { Task } from './Task';
import type { TaskStrategy } from "./TaskStrategy.ts";


export class CompositeTask extends Task {
    private subTasks: Task[];

    constructor(name: string, strategy: TaskStrategy | null = null) {
        super(name, strategy);
        this.subTasks = [];
    }

    addSubTask(task: Task): void {
        this.subTasks.push(task);
    }

    removeSubTask(taskName: string): void {
        this.subTasks = this.subTasks.filter(task => task.name !== taskName);
    }

    async execute(): Promise<void> {
        this.updateStatus(`Composite task "${this.name}" execution started.`);

        // Execute all subtasks with delays
        for (const task of this.subTasks) {
            if (!task.isComplete) {
                await task.execute(); // Wait for each subtask to finish
            }
        }

        // Execute the composite's own logic, if it has a strategy
        if (this.strategy) {
            await this.strategy.execute(this);
        }

        this.markComplete();
    }
}
