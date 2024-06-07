import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Alert,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TaskType } from "@/store";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Easing,
  RollInLeft,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  measure,
} from "react-native-reanimated";
import { useStore } from "../hooks/useStore"; // Adjust the path as necessary
import { observer } from "mobx-react";

interface TaskBoxProps {
  item: TaskType;
  isTasks?: boolean; // Add this line to accept isTasks as a prop
  editFucntion: Function;
  delFunction: Function;
}

const TaskBox: React.FC<TaskBoxProps> = observer(({ item, isTasks,editFucntion, delFunction }) => {
  const { taskStore } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [animation] = useState(new Animated.Value(0));

  const hiddenComponentRef = useAnimatedRef();

  const rightSwipe = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable style={({ pressed }) => [
        styles.deleteButton,
        { backgroundColor: pressed ? '#ddd' : '#bcf0b9' }
      ]} onPress={editFucntion()}>
          <FontAwesome5 name="trash" size={18} />
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <FontAwesome5 name="trash" size={18} />
        </Pressable>
      </View>
    );
  };

  const measureHeight = () => {
    const measurements = measure(hiddenComponentRef);
    if (measurements) {
      setContainerHeight(measurements.height);
    }
  };

  //   const onContainerLayout = (event: LayoutChangeEvent) => {
  //     const { height } = event.nativeEvent.layout;
  //     if (height > 1) {
  //       setContainerHeight(height);
  //     }
  //   };

  //   (() => {
  //     taskStore.loadTasks();
  //   }, [authStore, taskStore]);

  //   const toggleAccordion = () => {
  //     setIsOpen(!isOpen);
  //     measureHeight()
  //   };
  function toggleAccordion() {
    if (!isOpen) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  }

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  // function toggleAccordion() {
  //     if (!isOpen) {
  //       Animated.timing(animation, {
  //         toValue: 1,
  //         duration: 100,
  //         useNativeDriver: false,
  //       }).start();
  //     } else {
  //       Animated.timing(animation, {
  //         toValue: 0,
  //         duration: 100,
  //         useNativeDriver: false,
  //       }).start();
  //     }
  //     setIsOpen(!isOpen);
  //   }
  useEffect(() => {
    measureHeight();
  }, []);

  return (
    <Swipeable renderRightActions={rightSwipe}>
      {/* <View style={{ borderColor: "#000", borderWidth: 1 }}> */}
        <Pressable
          style={({ pressed }) => [
            {
              transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
            },
            styles.container,
          ]}
          onPress={toggleAccordion}
        >
          {item && (
            <View style={styles.align}>
              <Text style={styles.priority}>{item.priority}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        </Pressable>
        <Animated.View style={{ height: heightAnimationInterpolation }}>
          <View id="container">
            <Text>{item.description}</Text>
          </View>
        </Animated.View>
      {/* </View> */}
      
    </Swipeable>
  );
});

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
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.3 },
    shadowOpacity: 0.5,
    shadowRadius: 0.2,
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
    margin: 1,
  },
  animated: {
    // height: 1,
    overflow: "hidden",
  },
});
