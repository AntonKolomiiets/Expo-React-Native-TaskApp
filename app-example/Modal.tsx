import { StyleSheet, Modal, Pressable, View } from "react-native";

const ModalTasks = () => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
        },
        styles.view,
      ]}
    >
      <View />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 100,
    width: 100,
    backgroundColor: "#ddd",
  },
});

export default ModalTasks;
