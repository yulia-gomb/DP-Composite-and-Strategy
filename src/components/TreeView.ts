import type { Task } from "../models/Task.ts";
import { CompositeTask } from "../models/CompositeTask.ts";

export class TreeView {
    private container: HTMLElement;
    private readonly onTaskComplete: (task: Task) => void;

    constructor(containerId: string, onTaskComplete: (task: Task) => void) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id "${containerId}" not found.`);
        }
        this.container = container;
        this.onTaskComplete = onTaskComplete;
    }

    renderTree(task: Task, level: number = 0): void {
        const taskElement = document.createElement('div');

        taskElement.style.marginLeft = `${level * 20}px`;
        taskElement.style.padding = '5px';
        taskElement.style.cursor = 'pointer';

        // Style tasks differently based on type
        if (task instanceof CompositeTask) {
            taskElement.style.fontWeight = 'bold'; // Bold for composite tasks
            taskElement.textContent = `📁 ${task.name} ${task.isComplete ? '✔️' : ''}`;
        } else {
            taskElement.style.color = '#555'; // Different color for simple tasks
            taskElement.textContent = `📄 ${task.name} ${task.isComplete ? '✔️' : ''}`;
        }

        taskElement.addEventListener('click', () => {
            if (!task.isComplete) {
                this.onTaskComplete(task);
            }
        });

        this.container.appendChild(taskElement);

        if (task instanceof CompositeTask && task.subTasks.length > 0) {
            task.subTasks.forEach(subTask => this.renderTree(subTask, level + 1));
        }
    }
}
