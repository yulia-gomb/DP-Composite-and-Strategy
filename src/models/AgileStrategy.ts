import { Task } from './Task';
import type { TaskStrategy } from './TaskStrategy';
import { delay } from "../utils/delay.ts";

export class AgileStrategy implements TaskStrategy {

    async execute(task: Task): Promise<void> {
        const iterations = 3;

        task.updateStatus(`AGILE execution STARTED for task: "${task.name}"`);
        console.log(`AGILE execution STARTED for task: "${task.name}"`);

        for (let i = 1; i <= iterations; i++) {
            await delay(1000);
            task.updateStatus(`Iteration ${i} for task: "${task.name}" completed.`);
            console.log(`Iteration ${i} for task: "${task.name}" completed`);
        }

        task.updateStatus(`AGILE execution FINISHED for task: "${task.name}".`);
        console.log(`AGILE execution FINISHED for task: "${task.name}"`);

        task.markComplete();
    }
}
