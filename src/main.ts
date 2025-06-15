import { CompositeTask } from "./models/CompositeTask.ts";
import { loadProjectFromJson } from "./services/TaskLoader.ts";
import { TreeView } from "./components/TreeView.ts";
import type {Task} from "./models/Task.ts";

class App {
    private project: CompositeTask | null = null;
    private readonly treeView: TreeView;

    constructor() {
        this.treeView = new TreeView('taskTable');
    }

    async initialize(): Promise<void> {
        this.project = await loadProjectFromJson('/tasks.json');
        if (this.project) {
            // Set callbacks for all tasks within the project
            this.setTaskCallbacks(this.project);
            console.log(`Project "${this.project.name}" loaded successfully.`);
            this.renderTable();
        }
    }

    async execute(): Promise<void> {
        if (this.project) {
            await this.project.execute();
        }
    }

    renderTable(): void {
        if (this.project) {
            this.treeView.render(this.project);
        }
    }

    // Set status callbacks for all tasks recursively
    private setTaskCallbacks(task: Task): void {
        task.setStatusCallback(this.treeView.updateStatus.bind(this.treeView));

        if (task instanceof CompositeTask && task.subTasks.length > 0) {
            task.subTasks.forEach(subTask => this.setTaskCallbacks(subTask));
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
