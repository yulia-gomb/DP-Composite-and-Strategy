import { Task } from './Task';
import type {TaskStrategy} from './TaskStrategy';

export class WaterfallStrategy implements TaskStrategy {

    execute(task: Task): void {
        const steps = ['Planning', 'Design', 'Implementation', 'Testing', 'Deployment'];

        task.updateStatus(`WATERFALL execution STARTED for task: "${task.name}"`);
        console.log(`WATERFALL execution STARTED for task: "${task.name}"`);

        for (const step of steps) {
            task.updateStatus(`Step "${step}" for task: "${task.name}" completed`);
            console.log(`Step "${step}" for task: "${task.name}" completed`);
        }

        task.updateStatus(`WATERFALL execution FINISHED for task: "${task.name}"`);
        console.log(`WATERFALL execution FINISHED for task: "${task.name}"`);

        task.markComplete();
    }
}
