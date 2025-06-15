import { Task } from './Task';
import type {TaskStrategy} from './TaskStrategy';
import { delay } from "../utils/delay.ts";

export class RUPStrategy implements TaskStrategy {

    async execute(task: Task): Promise<void> {
        const phases = ['Inception', 'Elaboration', 'Construction', 'Transition'];

        task.updateStatus(`RUP execution STARTED for task: "${task.name}"`);
        console.log(`RUP execution STARTED for task: "${task.name}"`);

        for (const phase of phases) {
            await delay(1000);
            task.updateStatus(`RUP: Phase "${phase}" for task: "${task.name}" completed`);
            console.log(`RUP: Phase "${phase}" for task: "${task.name}" completed`);
        }

        task.updateStatus(`RUP execution FINISHED for task: "${task.name}"`);
        console.log(`RUP execution FINISHED for task: "${task.name}"`);

        task.markComplete();
    }
}