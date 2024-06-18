import { Stack, Tabs, Link } from "expo-router";
import { Provider } from "mobx-react";
import store from "@/store/models/RootStore";
import { View } from "react-native";
import Index from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Settings from "./settings";
import { useColorScheme } from "react-native";
import ThemeProvider from "@/theme/ThemeContext";
import { LightTheme, DarkTheme } from "@/theme/theme";
import useTheme from "@/theme/useTheme";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

// export default function RootLayout() {
//   const { theme } = useTheme();

//   return (
//     <ThemeProvider>
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           <Stack
//             screenOptions={() => ({
//               headerStyle: { backgroundColor: theme.colors.text },
//               headerTintColor: theme.colors.background,
//               headerTitleStyle: { color: theme.colors.background },
//               contentStyle: { backgroundColor: theme.colors.background },
//             })}
          
//           >
//             <Stack.Screen
//               name="index"
//               options={{ headerShown: false, title: "Tasks" }}
//             />
//             <Stack.Screen name="settings" options={{ title: "Settings" }} />
//           </Stack>
//         </Provider>
//       </QueryClientProvider>
//     </ThemeProvider>
//   );
// }

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={() => ({
        headerStyle: { backgroundColor: theme.colors.header },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { color: theme.colors.text },
        contentStyle: { backgroundColor: theme.colors.text },
      })}
    >
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Tasks' }} />
      <Stack.Screen name="settings"  options={{ title: 'Settings' }} />
    </Stack>
  );
};