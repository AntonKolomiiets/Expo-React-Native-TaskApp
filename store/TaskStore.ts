import { types, flow, Instance, getSnapshot, detach } from "mobx-state-tree";
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
        // Ensure tasks match the Task model
        const taskModels = tasks.map(task => Task.create(task));
        self.tasks.replace(taskModels);
        return taskModels;
        // self.tasks.replace(tasks);
        // return tasks
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    }),
    addTask: flow(function* (taskData: any) {
      try {
        const response = yield addTask(taskData);
        return response; // Return the response for handling in the component
      } catch (error) {
        console.error("Failed to add task", error);
        throw error;
      }
    }),
    //  editTask: flow(function* (taskId: number, taskData: any) {
    //   try {
    //     const updatedTask = yield editTask(taskId, taskData);
    //     const index = self.tasks.findIndex((task) => task.id === taskId);
    //     if (index !== -1) {
    //       self.tasks[index] = Task.create(updatedTask);
    //     }
    //   } catch (error) {
    //     console.error("Failed to edit task", error);
    //   }
    // }),
    editTask: flow(function* (taskId: number, taskData: any) {
      try {
        const response = yield editTask(taskId, taskData);
        return response; // Return the response for handling in the component
      } catch (error) {
        console.error("Failed to edit task", error);
        throw error;
      }
    }),
    deleteTask: flow(function* (taskId: number) {
      try {
        const task = self.tasks.find(t => t.id === taskId);
        if (task) detach(task); // Detach task from the tree before deletion
        const response = yield deleteTask(taskId);
        console.log(response)
        if (response.message === `Deleted item with id: ${taskId}`) {
          yield self.loadTasks()
          self.tasks.replace(self.tasks.filter(t => t.id !== taskId));
        }
        return response;
      } catch (error) {
        console.error("Failed to delete task", error);
        throw error;
      }
    }),
  }));

export default TaskStore;
export interface ITaskStore extends Instance<typeof TaskStore> {}
