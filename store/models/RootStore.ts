import { types } from "mobx-state-tree";
import TaskStore from "../TaskStore";
import AuthStore from "../AuthStore";

 const RootStore = types.model("RootStore", {
  taskStore: TaskStore,
  authStore: AuthStore,
});

const store = RootStore.create({
  taskStore: {
    tasks: [],
  },
  authStore: {
    token: undefined,
    username: undefined,
  },
});

export type IRootStore = typeof store;
export default store;
