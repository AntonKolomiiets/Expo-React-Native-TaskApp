import { Stack, Tabs } from "expo-router";
import { Provider } from "mobx-react";
import store from "@/store/models/RootStore";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack></Stack>
    </Provider>
  );
}
