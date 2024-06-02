import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import ModalTasks from "./Modal";

const Index = observer(() => {
  const { taskStore, authStore } = useStore();

  // useEffect(() => {
  //   if (authStore.userId) {
  //     taskStore.loadTasks(authStore.userId);
  //   }
  // }, [authStore.userId]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalTasks />
      <Link href="/login" asChild>
        <Pressable>
          <Text>Open</Text>
        </Pressable>
      </Link>
    </View>
  );
});

export default Index;
