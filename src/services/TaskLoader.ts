import {CompositeTask} from "../models/CompositeTask.ts";
import type {Task} from "../models/Task.ts";
import {TaskFactory} from "../models/TaskFactory.ts";

export async function loadProjectFromJson(url: string): Promise<CompositeTask> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load JSON file: ${response.status}`);
    }

    const data = await response.json();

    // Create the root CompositeTask for the project
    const project = new CompositeTask(data.name);

    // Parse the tasks recursively
    const parseTasks = (tasks: any[]): Task[] => {
        return tasks.map(taskJson => {
            const task = TaskFactory.createTask(taskJson.name, taskJson.type);

            if (taskJson.subTasks && taskJson.subTasks.length > 0) {
                const subTasks = parseTasks(taskJson.subTasks);
                if (task instanceof CompositeTask) {
                    subTasks.forEach(subTask => task.addSubTask(subTask));
                }
            }

            return task;
        });
    };

    // Parse top-level tasks and attach them to the project
    const projectTasks = parseTasks(data.tasks);
    projectTasks.forEach(task => project.addSubTask(task));

    return project;
}