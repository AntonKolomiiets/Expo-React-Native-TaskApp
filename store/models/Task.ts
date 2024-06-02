import { types, Instance } from "mobx-state-tree";

const Task = types
  .model("Task").props({
    id: types.identifierNumber,
    user_id: types.number,
    title: types.string,
    description: types.maybe(types.string),
    status: types.number,
    created_at: types.string,
    due_date: types.maybe(types.string),
    priority: types.number,
  })
  .actions((self) => ({
    toggle() {
      self.status = self.status === 0 ? 1 : 0;
    },
    setTitle(newTitle: string) {
      self.title = newTitle;
    },
    setDescription(newDescription: string) {
      self.description = newDescription;
    },
    setDueDate(newDueDate: string) {
      self.due_date = newDueDate;
    },
    setPriority(newPriority: number) {
      self.priority = newPriority;
    },
  }));

export default Task;
export type TaskType = Instance<typeof Task>;