import { Task } from './Task';
import type { TaskStrategy } from "./TaskStrategy.ts";


export class SimpleTask extends Task {
    constructor(name: string, strategy: TaskStrategy) {
        super(name, strategy);
    }

    async execute(): Promise<void> {
        console.log(`Executing simple task: "${this.name}"`);
        if (this.strategy) {
            this.strategy.execute(this);
        } else {
            console.log(`No execution strategy defined for task: "${this.name}"`);
        }
        this.markComplete();
    }
}
