import React, { useEffect, useState, } from "react";
import { Text, View, Button, StyleSheet, FlatList, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import LoginModal from "@/components/LoginModal";
import TaskBox from "@/components/TaskBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import EditModal from "@/components/EditModal";
import { TaskType } from "@/store";
// import { bebe } from "@/api/api";

const Index = observer(() => {
  const [isTasks, setIsTasks] = useState(false);
  const { taskStore, authStore } = useStore();

  // EditModal state
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  // const [showModal, setShowModal] = useState(false);

  // Togle Modal
  const openModal = (mode: "create" | "edit", task: any = null) => {
    setMode(mode);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    authStore.logout();
  };

  const { data, isLoading, error, isSuccess, refetch } = useQuery({
    queryKey: ["tasks", authStore.token],
    queryFn: () => taskStore.loadTasks(),
    enabled: !!authStore.token,
  });

  useEffect(() => {
    setIsTasks(isSuccess && !!data && data.length > 0);
  }, [isSuccess, data]);

  const fucntDeleteTask = async (id: number) => {
    try {
      const res = await taskStore.deleteTask(id);
      if (res.message === `Deleted item with id: ${id}`) {
        console.log("okokok")
        // refetch(); // Refetch tasks after successful delete
      }

      // await taskStore.loadTasks();
      // refetch()

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete task", error);
      Alert.alert("Failed to delete task");
    }
  };

  const reff = () => {
    refetch();
  };

  const reload = async () => {
    await taskStore.loadTasks();
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        {isModalOpen && (
          <EditModal
            mode={mode}
            onClose={() => setIsModalOpen(false)}
            task={currentTask}
          />
        )}

        {authStore.username && (
          <Text style={styles.text}>Wellcome, {authStore.username}!</Text>
        )}

        {/* {isTasks && <TaskBox item={taskStore.tasks[0]} isTasks={isTasks} />} */}
        {/* {isTasks && <TaskBox item={taskStore.tasks[1]} isTasks={isTasks} />} */}
        <FlatList
          data={taskStore.tasks}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskBox
              item={item}
              isTasks={isTasks}
              editFunction={() => openModal("edit", item)}
              delFunction={() => fucntDeleteTask(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
        />

        {!authStore.isAuthenticated && <LoginModal />}
        {!!authStore.isAuthenticated && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button title="AddTask" onPress={() => openModal("create")} />
            <Button title="Log Out" onPress={handleLogout} />
            <Button title="refetch" onPress={reff} />
            <Button title="reload" onPress={reload} />
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
});

export default Index;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F5EA",
  },
  text: {
    marginTop: 70,
    marginBottom: 20,
  },
  list: {},
  buttons: { marginHorizontal: 20 },
});
