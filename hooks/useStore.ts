import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { IRootStore } from "../store";

export const useStore = (): IRootStore => {
  const context = useContext(MobXProviderContext);
  if (!context) {
    throw new Error("useStore must be used within a MobXProviderContext");
  }
  const { store } = context as { store: IRootStore };
  return store;
};
