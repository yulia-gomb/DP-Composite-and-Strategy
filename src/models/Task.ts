import type { TaskStrategy } from './TaskStrategy';


export abstract class Task {
    name: string; // Task name
    isComplete: boolean; // Task completion status
    strategy: TaskStrategy | null; // Execution strategy for the task
    status: string; // Current status of the task ("Not Started", "In Progress", "Completed")
    private statusCallback: ((message: string) => void) | null = null; // Callback for status updates

    constructor(name: string, strategy: TaskStrategy | null = null) {
        this.name = name;
        this.isComplete = false; // Task starts as incomplete
        this.strategy = strategy;
        this.status = 'Not Started'; // Default status
    }

    setStatusCallback(callback: (message: string) => void): void {
        this.statusCallback = callback;
    }

    updateStatus(message: string): void {
        if (this.statusCallback) {
            this.statusCallback(message);
        }
    }

    setStatus(newStatus: string): void {
        this.status = newStatus;
        this.updateStatus(`Task "${this.name}" status updated to: ${newStatus}`);
    }

    markComplete(): void {
        this.isComplete = true;
        this.setStatus('Completed');
    }

    abstract execute(): Promise<void>;
}
