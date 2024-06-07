import { useState } from "react";
import {
    Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import { TaskType, ITaskStore } from "@/store";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";

interface EditModalProps {
  mode: "create" | "edit";
  onClose: () => void;
  task?: TaskType;
}

const EditModal: React.FC<EditModalProps> = observer(
  ({ mode, onClose, task }) => {
    const { taskStore } = useStore() as { taskStore: ITaskStore };
    const [date, setDate] = useState(new Date());
    const editMode = mode === "edit";

    const [data, setData] = useState({
      title: editMode ? task.title : "",
      description: editMode ? task.description : "",
      due_date: editMode ? task.due_date : "",
      priority: editMode ? task.priority : 0,
      status: editMode ? task.status : 0,
    });

    // write to data
    const handleChange = (name: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    //   const handleSave = () => {
    //     if (editMode && task) {
    //         taskStore.editTask(task.id, data);
    //       } else {
    //         taskStore.addTask(data);
    //       }
    //       onClose();
    //     };

    const handleSave = async () => {
        try {
          if (editMode && task) {
            const response = await taskStore.editTask(task.id, data);
            if (response.message === "Task updated successfully") {
              await taskStore.loadTasks(); // Refetch tasks after successful update
            }
          } else {
            await taskStore.addTask(data);
            await taskStore.loadTasks(); // Refetch tasks after adding a new task
          }
          onClose();
        } catch (error) {
          console.error("Failed to save task", error);
          Alert.alert("Failed to save task");
        }
      };

    return (
      <Modal transparent animationType="slide">
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.box}>
              <Text style={styles.title}>Hi there!</Text>
              <TextInput
                style={styles.input_title}
                placeholder="Enter Task Title"
                value={data.title}
                onChangeText={(value) => handleChange("title", value)}
              />
              <TextInput
                style={styles.input_description}
                placeholder="Enter multiline text here"
                multiline={true}
                numberOfLines={4}
                value={data.description}
                onChangeText={(value) => handleChange("description", value)}
              />
              <DateTimePicker
                style={{ alignSelf: "center" }}
                value={date}
                mode="date"
                display="default"
                is24Hour={true}
              />
              <Slider
                style={{ width: 200, height: 40, alignSelf: "center" }}
                minimumValue={0}
                maximumValue={3}
                step={0.1}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 20,
                }}
              >
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={onClose} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
);

export default EditModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
  },
  box: {
    backgroundColor: "#fff",
    width: "95%",
    borderWidth: 0,
    borderRadius: 10,
    // padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    margin: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  input_title: {
    height: 40,
    marginHorizontal: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 10,
  },
  input_description: {
    height: 140,
    marginHorizontal: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingLeft: 10,
    overflow: "scroll",
  },
});
