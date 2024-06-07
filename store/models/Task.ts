import { types, Instance } from "mobx-state-tree";

// import { types } from "mobx-state-tree";

const Task = types.model("Task", {
  id: types.identifierNumber,
  user_id: types.number,
  title: types.string,
  description: types.maybe(types.string),
  status: types.number,
  created_at: types.string,
  due_date: types.maybe(types.string),
  priority: types.number,
});

// export default Task;


export default Task;
export type TaskType = Instance<typeof Task>;