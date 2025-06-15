import { Task } from './Task';
import type { TaskStrategy } from "./TaskStrategy.ts";


export class CompositeTask extends Task {
    subTasks: Task[];

    constructor(name: string, strategy: TaskStrategy | null = null) {
        super(name, strategy);
        this.subTasks = [];
    }

    addSubTask(task: Task): void {
        this.subTasks.push(task);
    }

    async execute(): Promise<void> {
        this.updateStatus(`Composite task "${this.name}" execution STARTED.`);

        // Execute all subtasks with delays
        for (const task of this.subTasks) {
            if (!task.isComplete) {
                await task.execute();
            }
        }

        if (this.strategy) {
            this.strategy.execute(this);
        }

        this.updateStatus(`Composite task "${this.name}" execution FINISHED.`);
        this.markComplete();
    }
}
