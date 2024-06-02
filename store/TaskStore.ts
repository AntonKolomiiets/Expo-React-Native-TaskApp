import { types, flow } from "mobx-state-tree";
import Task from "./models/Task";
import { fetchTasks, addTask, editTask, deleteTask } from "../api/TaskApi";

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    loadTasks: flow(function* () {
      try {
        const tasks = yield fetchTasks();
        self.tasks.replace(tasks);
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    }),
    addTask: flow(function* (taskData: any) {
      try {
        const newTask = yield addTask(taskData);
        self.tasks.push(newTask);
      } catch (error) {
        console.error("Failed to add task", error);
      }
    }),
    editTask: flow(function* (taskId: number, taskData: any) {
      try {
        const updatedTask = yield editTask(taskId, taskData);
        const index = self.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          self.tasks[index] = updatedTask;
        }
      } catch (error) {
        console.error("Failed to edit task", error);
      }
    }),
    deleteTask: flow(function* (taskId: number) {
      try {
        yield deleteTask(taskId);
        self.tasks.replace(self.tasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }),
  }));

export default TaskStore;
