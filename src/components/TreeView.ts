import type { Task } from "../models/Task.ts";
import { CompositeTask } from "../models/CompositeTask.ts";

export class TreeView {
    private container: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id "${containerId}" not found.`);
        }
        this.container = container;
    }

    renderTable(task: Task, level: number = 0): void {
        const row = document.createElement('tr');

        // First column: tasks
        const nameCell = document.createElement('td');
        nameCell.style.paddingLeft = `${level * 20}px`; // Indent based on level
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        if (task instanceof CompositeTask) {
            nameCell.textContent = `📁 ${task.name}`;
        } else {
            nameCell.textContent = `📄 ${task.name}`;
        }
        row.appendChild(nameCell);

        // Second column: status
        const statusCell = document.createElement('td');
        statusCell.textContent = task.status === 'Not Started' ? ('Not Started: '+ task.strategy?.constructor.name) || 'No Strategy' : task.status;
        row.appendChild(statusCell);

        // Attach row to the table body
        const tableBody = this.container.querySelector('tbody');
        if (!tableBody) {
            throw new Error('Table body not found.');
        }
        tableBody.appendChild(row);

        // Recursively render subtasks
        if (task instanceof CompositeTask && task.subTasks.length > 0) {
            task.subTasks.forEach(subTask => this.renderTable(subTask, level + 1));
        }
    }

    // Re-render the entire table
    render(task: CompositeTask): void {
        // Clear the table
        const tableBody = this.container.querySelector('tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            this.renderTable(task);
        }
    }
}
