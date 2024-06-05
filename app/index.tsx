import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Button, Modal, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import ModalTasks from "./Modal";
import LoginModal from "@/components/LoginModal";
import SwipeDrawer from "@/components/SwipeDrawer";
import TaskBox from "@/components/TaskBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { bebe } from "@/api/api";

const Index = observer(() => {
  const { taskStore, authStore } = useStore();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    authStore.logout();
  };

  useEffect(() => {
    taskStore.loadTasks();
  }, [authStore, taskStore]);

  useEffect(() => {
    bebe();
  }, [])

  // useEffect(() => {
  //   if (authStore.userId) {
  //     taskStore.loadTasks(authStore.userId);
  //   }
  // }, [authStore.userId]);

  return (
    <GestureHandlerRootView >
    <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <SwipeDrawer onLogout={handleLogout}/> */}
        {authStore.username && <Text>Wellcome, {authStore.username}!</Text>}
        <ModalTasks />
        {taskStore.tasks && <TaskBox item={taskStore.tasks[0]} />}
        {taskStore.tasks && <TaskBox item={taskStore.tasks[1]} />}
        <Link href="/login" asChild>
          <Pressable>
            <Text>Open</Text>
          </Pressable>
        </Link>
        {!authStore.isAuthenticated && <LoginModal />}
        {!!authStore.isAuthenticated && (
          <Button title="Log Out" onPress={handleLogout} />
        )}
      </View>
        </GestureHandlerRootView>
  );
});

export default Index;
