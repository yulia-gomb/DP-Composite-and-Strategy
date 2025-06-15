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

    run(): void {
        const devTask = TaskFactory.createTask('Frontend Development', 'development');
        devTask.setStatusCallback((msg) => this.updateLogs(msg));

        const testTask = TaskFactory.createTask('Unit Testing', 'testing');
        testTask.setStatusCallback((msg) => this.updateLogs(msg));

        const designTask = TaskFactory.createTask('Design', 'design');
        designTask.setStatusCallback((msg) => this.updateLogs(msg));

        devTask.execute();
        testTask.execute();
        designTask.execute();
    }
}

const app = new App();
app.run();
