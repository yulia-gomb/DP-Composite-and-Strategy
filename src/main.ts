import type { CompositeTask } from "./models/CompositeTask.ts";
import { loadProjectFromJson } from "./services/TaskLoader.ts";
import { TreeView } from "./components/TreeView.ts";

class App {
    private project: CompositeTask | null = null;
    private taskLogs: string[] = [];
    private treeView: TreeView;

    constructor() {
        this.treeView = new TreeView('tree');
    }

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

    async initialize(): Promise<void> {

        this.project = await loadProjectFromJson('/tasks.json');

        if (this.project) {
            this.project.setStatusCallback((msg) => this.updateLogs(msg));
            console.log(`Project "${this.project.name}" loaded successfully.`);
        }

        this.renderTree();
    }

    async execute(): Promise<void> {
        if (this.project) {
            await this.project.execute();
            this.renderTree(); // Update the tree view after execution
        }
    }

    private renderTree(): void {
        const treeContainer = document.getElementById('tree');
        if (treeContainer) {
            treeContainer.innerHTML = ''; // Clear previous tree
            if (this.project) {
                this.treeView.renderTree(this.project);
            }
        }
    }
}

const app = new App();

(async () => {
    await app.initialize();
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', async () => {
            await app.execute();
        });
    }
})();
