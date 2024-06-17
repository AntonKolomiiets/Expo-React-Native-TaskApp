import { useState } from "react";
import { Text, View, Pressable, StyleSheet, Button } from "react-native";
import { useStore } from "../hooks/useStore";

const SortMenu = ({handleLogout}: any) => {
  const [flagDateCreated, setFlagDateCreated] = useState(false);
  const [flagDateComplete, setFlagDateComplete] = useState(false);
  const [flagPriority, setFlagPriority] = useState(false);
  const { taskStore } = useStore();

  // Sort functions
  const sortDateCreated = () => {
    const newOrder = !flagDateCreated;
    setFlagDateCreated(newOrder);
    taskStore.sortTasks("dateCreated", newOrder);
  };

  const sortDateComplete = () => {
    const newOrder = !flagDateComplete;
    setFlagDateComplete(newOrder);
    taskStore.sortTasks("dateComplete", newOrder);
  };

  const sortPriority = () => {
    const newOrder = !flagPriority;
    setFlagPriority(newOrder);
    taskStore.sortTasks("priority", newOrder);
  };

 

  return (
    <View style={[styles.menu, styles.shadowProp]}>
      <View style={styles.textContainer}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#ddd" : "#FFFFFF00" },
            styles.textRow,
            styles.borderBottom,
          ]}
          onPress={sortDateCreated}
        >
          <Text style={styles.textInRow}>Created</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#ddd" : "#FFFFFF00" },
            styles.textRow,
            styles.borderBottom,
          ]}
          onPress={sortDateComplete}
        >
          <Text style={styles.textInRow}>Due Date</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#ddd" : "#FFFFFF00" },
            styles.textRow,
            styles.borderBottom,
          ]}
          onPress={sortPriority}
        >
          <Text style={styles.textInRow}>Priority</Text>
        </Pressable>
        <Button title="Log Out" onPress={handleLogout}/>
      </View>
    </View>
  );
};

export default SortMenu;

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    right: 23,
    top: 105,
    zIndex: 2,
    backgroundColor: "#FFFFFFBB",
    width: 130,
    borderRadius: 12,
    paddingBottom: 12,
  },
  textContainer: {
    marginTop: 30,
    alignSelf: "center",
  },
  textRow: {
    borderRadius: 6,
    width: 110,
    alignItems: "center",
    paddingVertical: 8,
  },
  textInRow: {
    fontSize: 16,
  },
  borderBottom: { borderBottomWidth: 0.6, borderBlockColor: "#DDD" },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
