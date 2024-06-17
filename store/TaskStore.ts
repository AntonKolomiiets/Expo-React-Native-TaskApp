import {
  types,
  flow,
  Instance,
  getSnapshot,
  detach,
  destroy,
} from "mobx-state-tree";
import Task, { TaskType } from "./models/Task";
import { fetchTasks, addTask, editTask, deleteTask } from "../api/TaskApi";

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    setTasks: (tasks: Instance<typeof Task>[]) => {
      self.tasks.replace(tasks);
    },
  }))
  .actions((self) => ({
    loadTasks: flow(function* () {
      try {
        const tasks = yield fetchTasks();
        // Ensure tasks match the Task model
        const taskModels = tasks.map((task: TaskType) => Task.create(task));
        // self.tasks.replace(taskModels);\
        self.setTasks(taskModels);
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
        return response;
      } catch (error) {
        console.error("Failed to add task", error);
        throw error;
      }
    }),

    editTask: flow(function* (taskId: number, taskData: any) {
      try {
        const response = yield editTask(taskId, taskData);
        return response;
      } catch (error) {
        console.error("Failed to edit task", error);
        throw error;
      }
    }),
    deleteTask: flow(function* (taskId: number) {
      try {
        const task = self.tasks.find((t) => t.id === taskId);
        if (task) {
          // detach(task);
          const response = yield deleteTask(taskId);
          console.log(response);
          if (response.message === `Deleted item with id: ${taskId}`) {
            const newTasks = self.tasks.filter((t) => t.id !== taskId);
            self.setTasks(newTasks);
            console.log("it's ok");
          }
          return response;
        }
      } catch (error) {
        console.error("Failed to delete task", error);
        throw error;
      }
    }),
    sortTasks(
      criteria: "dateCreated" | "dateComplete" | "priority",
      ascending: boolean
    ) {
      const sortedTasks = [...self.tasks].sort((a, b) => {
        let compareA, compareB;

        switch (criteria) {
          case "dateCreated":
            compareA = new Date(a.created_at).getTime();
            compareB = new Date(b.created_at).getTime();
            break;
          case "dateComplete":
            compareA = a.due_date ? new Date(a.due_date).getTime() : -Infinity;
            compareB = b.due_date ? new Date(b.due_date).getTime() : -Infinity;
            break;
          case "priority":
            compareA = a.priority !== 0 ? a.priority : -Infinity;
            compareB = b.priority !== 0 ? b.priority : -Infinity;
            break;
          default:
            return 0;
        }

        if (compareA === compareB) {
          return 0;
        } else if (compareA === -Infinity || compareB === -Infinity) {
          return compareA === -Infinity ? 1 : -1;
        } else {
          return ascending ? compareA - compareB : compareB - compareA;
        }
      });
      self.setTasks(sortedTasks);
    },
  }));

export default TaskStore;
export interface ITaskStore extends Instance<typeof TaskStore> {}
