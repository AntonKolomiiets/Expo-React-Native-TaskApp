import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TaskType } from "@/store";
import { FontAwesome5 } from "@expo/vector-icons";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react";
import useTheme from '@/theme/useTheme'



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

    const { theme } = useTheme()

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

    const renderPriority = (priority: number) => {
      return [...Array(priority)].map((_, index) => (
        <Text key={index} style={styles.priorityMark}>
          !
        </Text>
      ));
    };

    const returnDays = () => {
      if (!item.due_date) {
        return "";
      } else {
        const dueDate = new Date(item.due_date);
        const createdAt = new Date(item.created_at);
        let days =
          (dueDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
        if (days < 0.5) {
          return "Today";
        } else {
          days = Math.trunc(days);
          return days + " days left";
        }
      }
    };

    let days = returnDays(); // days variable

    const styles = StyleSheet.create({
      container: {
        // minHeight: 80,
        color: "#FFF",
        backgroundColor: theme.colors.header,
        justifyContent: "center",
        width: 360,
        // width: "100%",
        margin: 1,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderCurve: "continuous",
        borderBottomWidth: 0.5,
        borderBlockColor: theme.colors.border,
        alignSelf: "center",
      },
      title: {
        flex: 1,
        color: theme.colors.text,
      },
      align: {
        flexDirection: "row",
        height: 80,
        alignItems: "center",
      },
      priority: {
        paddingRight: 6,
      },
      priorityMark: {
        color: "#007AFF",
        fontWeight: "600",
      },
      due_date: {
        color: "#BBB",
      },
      descContainer: {
        // width: 360,
      },
      discription: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        
      },
      desctText: {
        color: theme.colors.text,
      },
      descButtonContainer: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
      },
      descButton: {
        alignSelf: "flex-end",
        marginLeft: 40,
        marginBottom: 10,
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
        marginVertical: 1,
      },
      deleteButton: {
        backgroundColor: "#d40808",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 8,
        borderTopStartRadius: 0,
        borderEndStartRadius: 0,
        marginVertical: 1,
      },
      animated: {
        // height: 1,
        overflow: "hidden",
      },
    });

    return (
      <Swipeable
        ref={swipeableRef}
        renderRightActions={rightSwipe}
        enabled={!isOpen}
      >
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
              <Text style={styles.priority}>{renderPriority(item.priority)}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.due_date}>{days}</Text>
            </View>
          )}
          <View
            style={[{ display: isOpen ? "flex" : "none" }, styles.discription]}
          >
            <View id="container" style={styles.descContainer}>
              <Text style={styles.desctText}>{item.description}</Text>
              <View style={styles.descButtonContainer}>
                <FontAwesome5
                  name="edit"
                  size={18}
                  style={styles.descButton}
                  onPress={editFunction}
                />
                <FontAwesome5
                  name="trash"
                  size={18}
                  style={styles.descButton}
                  onPress={handleDeletePress}
                />
              </View>
            </View>
          </View>
        </Pressable>
        {/* </View> */}
      </Swipeable>
    );
  }
);

export default TaskBox;


