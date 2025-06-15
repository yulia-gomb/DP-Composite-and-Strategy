import type { TaskStrategy } from './TaskStrategy';


export abstract class Task {
    name: string;
    isComplete: boolean;
    strategy: TaskStrategy | null;
    status: string;
    private statusCallback: ((task: Task) => void) | null = null;

    protected constructor(name: string, strategy: TaskStrategy | null = null) {
        this.name = name;
        this.isComplete = false;
        this.strategy = strategy;
        this.status = 'Not Started';
    }

    // Assign a callback to notify status updates in the UI
    setStatusCallback(callback: (task: Task) => void): void {
        this.statusCallback = callback;
    }

    // Update the current status and trigger the callback
    updateStatus(newStatus: string): void {
        this.status = newStatus;
        if (this.statusCallback) {
            this.statusCallback(this);
        }
    }

    // Set a new status for the task
    setStatus(newStatus: string): void {
        this.updateStatus(newStatus);
    }

    // Mark the task as completed
    markComplete(): void {
        this.isComplete = true;
    }

    abstract execute(): Promise<void>;
}
