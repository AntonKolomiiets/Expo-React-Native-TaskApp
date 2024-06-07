import { useState } from "react";
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
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TaskBox = ({ item }: { item: TaskType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  //   const [contentHeight, setContentHeight] = useState(0);
  const conteinerHeight = useSharedValue(0);
  const contentHeight = useSharedValue(0);

  const calculateLayout = (e: LayoutChangeEvent) => {
    if (Platform.OS === "web" || conteinerHeight.value === 0) {
      contentHeight.value = e.nativeEvent.layout.height + 32 + 2;
    }
  };

  const containerStyle = useAnimatedStyle(() => {
    let height = conteinerHeight.value; // Initialize with a default value
    if (conteinerHeight.value > 0 && contentHeight.value > 0) {
      height = withSpring(
        conteinerHeight.value + (isOpen ? contentHeight.value : 0),
        { damping: 15 }
      );
    }

    return {
      height,
    };
  }, [isOpen, conteinerHeight, contentHeight]);

  //   const animationHeight = item.description?.split(" ").length;

  //   const maxSwipeDistance = 10;

  const rightSwipe = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.deleteButton}>
          <FontAwesome5 name="trash" size={18} />
        </Pressable>
        <Pressable style={styles.deleteButton}>
          <FontAwesome5 name="trash" size={18} />
        </Pressable>
      </View>
    );
  };

  //   () => {Alert.alert('Hi')}
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

  return (
      <Swipeable renderRightActions={rightSwipe}>
        <Animated.View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={toggleAccordion}
        onLayout={calculateLayout}
        style={({ pressed }) => [
          {
            transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
          },
        //   styles.container,
        ]}
      >
        {item && (
          <View style={styles.align}>
            <Text style={styles.priority}>!!</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      </Pressable>
      <View>
        <View style={{ position: 'absolute', paddingTop: 16 }}
        onLayout={(e) => (contentHeight.value = e.nativeEvent.layout.height)}>
        <Text>{item.description}</Text>
        </View>
      </View>
      {/* <Animated.View style={{ height: heightAnimationInterpolation }}>
        {item && <Text>{item.description}</Text>}
      </Animated.View> */}
      </Animated.View>
    </Swipeable>
  );
};

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
});
