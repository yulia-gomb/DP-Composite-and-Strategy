import { Task } from './Task';
import { SimpleTask } from './SimpleTask';
import { AgileStrategy } from './AgileStrategy';
import { WaterfallStrategy } from './WaterfallStrategy';
import { RUPStrategy } from './RUPStrategy';
import { CompositeTask } from "./CompositeTask.ts";

export class TaskFactory {
    static createTask(name: string, type: string, hasSubTasks: boolean): Task {

        if (hasSubTasks) {
            return new CompositeTask(name); // Use CompositeTask if subtasks exist
        }

        switch (type) {
            case 'development':
                return new SimpleTask(name, new AgileStrategy());
            case 'testing':
                return new SimpleTask(name, new WaterfallStrategy());
            case 'design':
                return new SimpleTask(name, new RUPStrategy());
            default:
                throw new Error(`Unknown task type: "${type}"`);
        }
    }
}