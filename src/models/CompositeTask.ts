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
        console.log(`Subtask "${task.name}" added to "${this.name}".`);
    }

    removeSubTask(taskName: string): void {
        this.subTasks = this.subTasks.filter(task => task.name !== taskName);
        console.log(`Subtask "${taskName}" removed from "${this.name}".`);
    }

    execute(): void {
        console.log(`Executing composite task: "${this.name}"`);

        // Execute all subtasks
        for (const task of this.subTasks) {
            if (!task.isComplete) {
                task.execute();
            }
        }

        // Optionally execute the composite itself if it has a strategy
        if (this.strategy) {
            this.strategy.execute(this);
        }

        this.markComplete();
    }
}