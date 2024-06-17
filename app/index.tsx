import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore";
import LoginModal from "@/components/LoginModal";
import TaskBox from "@/components/TaskBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import EditModal from "@/components/EditModal";
import { toJS } from "mobx";
import { FontAwesome5 } from "@expo/vector-icons";
import SortMenu from "@/components/SortMenu";

const Index = observer(() => {
  const [isTasks, setIsTasks] = useState(false);
  const { taskStore, authStore } = useStore();

  // EditModal state
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  // const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Togle Edit Modal
  const openModal = (mode: "create" | "edit", task: any = null) => {
    setMode(mode);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    authStore.logout();
    setMenuOpen(false);
  };

  // Fetch initial tasks
  const { data, isLoading, error, isSuccess, refetch } = useQuery({
    queryKey: ["tasks", authStore.token],
    queryFn: () => taskStore.loadTasks(),
    enabled: !!authStore.token,
  });

  useEffect(() => {
    setIsTasks(isSuccess && !!data && data.length > 0);
  }, [isSuccess, data]);

  
// Handle deletion
  const fucntDeleteTask = async (id: number) => {
    try {
      const res = await taskStore.deleteTask(id);
      if (res.message === `Deleted item with id: ${id}`) {
        console.log("okokok");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete task", error);
      Alert.alert("Failed to delete task");
    }
  };

  const toggleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        {/*EDIT Modal with condition*/}
        {isModalOpen && (
          <EditModal
            mode={mode}
            onClose={() => setIsModalOpen(false)}
            task={currentTask}
          />
        )}
        {/*Main Title of the page*/}
        {authStore.username && (
          <Text style={styles.text}>Wellcome, {authStore.username}!</Text>
        )}
        {/*Layout buttons*/}
        {!!authStore.isAuthenticated && (
          <View
            style={{
              flexDirection: "row",
              width: 644,
              justifyContent: "space-around",
              zIndex: 5,
            }}
          >
            <FontAwesome5
              name="plus"
              size={24}
              style={styles.plus}
              onPress={() => openModal("create")}
            />
            <FontAwesome5
              name={menuOpen ? "circle" : "bars"}
              size={22}
              style={styles.bars}
              onPress={toggleOpenMenu}
            />
          </View>
        )}
        {/* Sort Menu here */}
        {menuOpen && <SortMenu handleLogout={handleLogout} />}
        {/* FlatList Here */}
        {authStore.isAuthenticated && (
          <FlatList
            data={toJS(taskStore.tasks)}
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
        )}
        {/* LoginModa */}
        {!authStore.isAuthenticated && <LoginModal />}
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
    height: "100%",

    overflow: "scroll",
  },
  text: {
    marginTop: 70,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 40,
  },
  buttons: { marginHorizontal: 20 },
  bars: {
    marginBottom: 12,
    zIndex: 4,
  },
  plus: {
    // margin: 8,
  },
});
