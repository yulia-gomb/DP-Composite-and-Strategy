import {CompositeTask} from "../models/CompositeTask.ts";
import type {Task} from "../models/Task.ts";
import {TaskFactory} from "../models/TaskFactory.ts";

export async function loadProjectFromJson(url: string): Promise<CompositeTask> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load JSON file: ${response.status}`);
    }

    const data = await response.json();

    const project = new CompositeTask(data.name);

    const parseTasks = (tasks: any[]): Task[] => {
        return tasks.map(taskJson => {

            const hasSubTasks = taskJson.subTasks && taskJson.subTasks.length > 0;

            const task = TaskFactory.createTask(taskJson.name, taskJson.type, hasSubTasks);

            if (hasSubTasks && task instanceof CompositeTask) {
                const subTasks = parseTasks(taskJson.subTasks); // Recursive call
                subTasks.forEach(subTask => task.addSubTask(subTask)); // Attach subtasks
            }

            return task;
        });
    };

    const projectTasks = parseTasks(data.tasks);
    projectTasks.forEach(task => project.addSubTask(task));

    return project;
}