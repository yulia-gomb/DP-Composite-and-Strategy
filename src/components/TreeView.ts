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

    private generateRowId(task: Task): string {
        return `task-${task.name.replace(/\s+/g, '-').toLowerCase()}`;
    }

    // Render tasks as rows in a table
    renderTable(task: Task, level: number = 0): void {
        const row = document.createElement('tr');
        const rowId = this.generateRowId(task);
        row.setAttribute('id', rowId);

        const nameCell = document.createElement('td');
        nameCell.style.paddingLeft = `${level * 20}px`;
        if (task instanceof CompositeTask) {
            nameCell.textContent = `📁 ${task.name}`;
        } else {
            nameCell.textContent = `📄 ${task.name}`;
        }
        row.appendChild(nameCell);

        // Second column: status
        const statusCell = document.createElement('td');
        statusCell.textContent = task.status; // Display the task's current status
        row.appendChild(statusCell);

        // Add the row to the table body
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

    // Render the entire table
    render(task: CompositeTask): void {
        const tableBody = this.container.querySelector('tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            this.renderTable(task);
        }
    }

    updateStatus(task: Task): void {
        const rowId = this.generateRowId(task);
        const row = document.getElementById(rowId);
        if (row) {
            const statusCell = row.querySelector('td:nth-child(2)');
            if (statusCell) {
                statusCell.textContent = task.status;
            }
        }
    }
}
