import { Stack, Tabs, Link } from "expo-router";
import { Provider } from "mobx-react";
import store from "@/store/models/RootStore";
import { View } from "react-native";
import Index from "./index"


export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack/>
    </Provider>
  );
}

