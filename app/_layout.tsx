import { Stack, Tabs, Link } from "expo-router";
import { Provider } from "mobx-react";
import store from "@/store/models/RootStore";
import { View } from "react-native";
import Index from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </QueryClientProvider>
  );
}
