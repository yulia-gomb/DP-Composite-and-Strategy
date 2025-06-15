import { Task } from './Task';
import type { TaskStrategy } from './TaskStrategy';

export class AgileStrategy implements TaskStrategy {

    execute(task: Task): void {
        const iterations = 3;

        task.updateStatus(`AGILE execution STARTED for task: "${task.name}"`);
        console.log(`AGILE execution STARTED for task: "${task.name}"`);

        for (let i = 1; i <= iterations; i++) {
            task.updateStatus(`Iteration ${i} for task: "${task.name}" completed.`);
            console.log(`Iteration ${i} for task: "${task.name}" completed`);
        }

        task.updateStatus(`AGILE execution FINISHED for task: "${task.name}".`);
        console.log(`AGILE execution FINISHED for task: "${task.name}"`);

        task.markComplete();
    }
}
