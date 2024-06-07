import React, { useState,useRef } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TaskType } from "@/store";
import { FontAwesome5 } from "@expo/vector-icons";

import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import { observer } from "mobx-react";

interface TaskBoxProps {
  item: TaskType;
  isTasks?: boolean;
  editFunction: () => void;
  delFunction: () => void;
}

const TaskBox: React.FC<TaskBoxProps> = observer(
  ({ item, isTasks, editFunction, delFunction }) => {
    const { taskStore } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const swipeableRef = useRef<Swipeable>(null);

    const deleteAlert = () => {
      Alert.alert(
        "Delete task?",
        "",
        [
          {
            text: "Delete",
            onPress: () => delFunction(),
          },
          {
            text: "Cancel",

            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    };

    const handleDeletePress = () => {
      deleteAlert();
      swipeableRef.current?.close();
    };



    const rightSwipe = () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              { backgroundColor: pressed ? "#ddd" : "#bcf0b9" },
            ]}
            onPress={editFunction}
          >
            <FontAwesome5 name="edit" size={18} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              { backgroundColor: pressed ? "#ddd" : "#d40808" },
            ]}
            onPress={handleDeletePress}
          >
            <FontAwesome5 name="trash" size={18} />
          </Pressable>
        </View>
      );
    };

    function toggleAccordion() {
      setIsOpen(!isOpen);
    }

    return (
      <Swipeable ref={swipeableRef} renderRightActions={rightSwipe}>
        {/* <View style={{ borderColor: "#000", borderWidth: 1 }}> */}
        <Pressable
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
            },
            styles.container,
          ]}
          onPress={toggleAccordion}
          onLongPress={editFunction}
        >
          {item && (
            <View style={styles.align}>
              <Text style={styles.priority}>{item.priority}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        </Pressable>
        <View
          style={[{ display: isOpen ? "flex" : "none" }, styles.discription]}
        >
          <View id="container">
            <Text>{item.description}</Text>
          </View>
        </View>
        {/* </View> */}
      </Swipeable>
    );
  }
);

export default TaskBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    color: "#FFF",
    backgroundColor: "#E6E7E9",
    justifyContent: "center",
    width: 360,
    margin: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderCurve: "continuous",
    borderBottomWidth: 0.5,
    borderBlockColor: "#a9b6b7",
    alignSelf: "center",
  },
  title: {
    flex: 1,
  },
  align: {
    flexDirection: "row",
  },
  priority: {
    color: "#007AFF",
    fontWeight: "600",
    paddingRight: 6,
  },
  discription: {
    width: 360,
    paddingHorizontal: 20,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.5,
    shadowRadius: 0.2,
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    // height: '100%',
    // borderRadius: 8,
    // borderTopStartRadius: 0,
    // borderEndStartRadius: 0,
    // margin: 1,
    marginVertical: 1,
  },
  deleteButton: {
    backgroundColor: "#d40808",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    // height: '100%',
    borderRadius: 8,
    borderTopStartRadius: 0,
    borderEndStartRadius: 0,
    // margin: 1,
    marginVertical: 1,
  },
  animated: {
    // height: 1,
    overflow: "hidden",
  },
});
