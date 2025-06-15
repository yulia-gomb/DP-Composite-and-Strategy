import type { TaskStrategy } from './TaskStrategy';


export abstract class Task {
    name: string;
    isComplete: boolean;
    strategy: TaskStrategy | null;

    private statusCallback: ((message: string) => void) | null = null;

    protected constructor(name: string, strategy: TaskStrategy | null = null) {
        this.name = name;
        this.isComplete = false;
        this.strategy = strategy;
    }

    setStatusCallback(callback: (message: string) => void): void {
        this.statusCallback = callback;
    }

    updateStatus(message: string): void {
        if (this.statusCallback) {
            this.statusCallback(message);
        }
    }

    markComplete(): void {
        this.isComplete = true;
        this.updateStatus(`Task "${this.name}" has been marked as complete.`);
    }

    abstract execute(): void;
}
