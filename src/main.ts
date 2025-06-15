import type { CompositeTask } from "./models/CompositeTask.ts";
import { loadProjectFromJson } from "./services/TaskLoader.ts";
import { TreeView } from "./components/TreeView.ts";

class App {
    private project: CompositeTask | null = null;
    private treeView: TreeView;

    constructor() {
        this.treeView = new TreeView('taskTable'); // Use `TreeView` for table rendering
    }

    async initialize(): Promise<void> {
        // Load project from JSON file
        this.project = await loadProjectFromJson('/tasks.json');
        if (this.project) {
            console.log(`Project "${this.project.name}" loaded successfully.`);
            this.renderTable();
        }
    }

    async execute(): Promise<void> {
        if (this.project) {
            await this.project.execute();
            this.renderTable(); // Re-render after execution
        }
    }

    renderTable(): void {
        if (this.project) {
            this.treeView.render(this.project); // Render tasks as table rows
        }
    }
}

const app = new App();

// Initialize and add event listeners
(async () => {
    await app.initialize();
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', async () => {
            await app.execute();
        });
    }
})();
