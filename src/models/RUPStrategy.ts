import { Task } from './Task';
import type {TaskStrategy} from './TaskStrategy';

export class RUPStrategy implements TaskStrategy {

    execute(task: Task): void {
        const phases = ['Inception', 'Elaboration', 'Construction', 'Transition'];

        task.updateStatus(`RUP execution STARTED for task: "${task.name}"`);
        console.log(`RUP execution STARTED for task: "${task.name}"`);

        for (const phase of phases) {
            task.updateStatus(`Phase "${phase}" for task: "${task.name}" completed`);
            console.log(`Phase "${phase}" for task: "${task.name}" completed`);
        }

        task.updateStatus(`RUP execution FINISHED for task: "${task.name}"`);
        console.log(`RUP execution FINISHED for task: "${task.name}"`);

        task.markComplete();
    }
}