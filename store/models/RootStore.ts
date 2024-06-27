import { applySnapshot, onSnapshot, types } from "mobx-state-tree";
import TaskStore from "../TaskStore";
import AuthStore from "../AuthStore";
import { storage, saveToMMKV, loadFromMMKV } from "../storage";

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

const savedStoreData = loadFromMMKV('store');
if (savedStoreData) {
  applySnapshot(store, savedStoreData);
}


onSnapshot(store, (snapshot) => {
  saveToMMKV('store', snapshot);
});

export type IRootStore = typeof store;
export default store;
