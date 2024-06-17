import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import { TaskType } from "@/store";

const TasksRender = observer(() => {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.loadTasks();
  }, [taskStore]);

  const renderTask = ({ item }: { item: TaskType }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      {/* <Text style={styles.cell}>{item.description}</Text> */}
      <Text style={styles.cell}>{item.status}</Text>
      <Text style={styles.cell}>{item.due_date}</Text>
      <Text style={styles.cell}>{item.priority}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Title</Text>
        {/* <Text style={styles.headerCell}>Description</Text> */}
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Due Date</Text>
        <Text style={styles.headerCell}>Priority</Text>
      </View>
      <FlatList
        data={taskStore.tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

export default TasksRender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    padding: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    padding: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
});
