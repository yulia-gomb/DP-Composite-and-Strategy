import {TaskFactory} from "./models/TaskFactory.ts";

class App {
    private taskLogs: string[] = []; // Array to store task execution logs

    private updateLogs(message: string): void {
        this.taskLogs.push(message);
        this.renderLogs();
    }

    private renderLogs(): void {
        const logContainer = document.getElementById('logs');
        if (logContainer) {
            logContainer.innerHTML = ''; // Clear previous logs
            this.taskLogs.forEach(log => {
                const logItem = document.createElement('div');
                logItem.textContent = log;
                logContainer.appendChild(logItem);
            });
        }
    }

    async run(): Promise<void> {
        const devTask = TaskFactory.createTask('Frontend Development', 'development');
        devTask.setStatusCallback((msg) => this.updateLogs(msg));

        const testTask = TaskFactory.createTask('Unit Testing', 'testing');
        testTask.setStatusCallback((msg) => this.updateLogs(msg));

        const designTask = TaskFactory.createTask('Design', 'design');
        designTask.setStatusCallback((msg) => this.updateLogs(msg));

        await devTask.execute();
        await testTask.execute();
        await designTask.execute();
    }
}

const app = new App();
app.run();
