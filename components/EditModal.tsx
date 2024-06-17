import { useState, useEffect } from "react";
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
    // const [date, setDate] = useState(new Date());
    const editMode = mode === "edit";

    const [data, setData] = useState({
      title: "",
      description: "",
      due_date: "",
      priority: 0,
      status: 0,
    });

    const initialDate =
      editMode && task?.due_date ? new Date(task.due_date) : new Date();
    const [date, setDate] = useState<Date | undefined>(
      editMode && task?.due_date ? new Date(task.due_date) : undefined
    );

    useEffect(() => {
      if (editMode && task) {
        setData({
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          priority: task.priority,
          status: task.status,
        });
        setDate(task.due_date ? new Date(task.due_date) : undefined);
      }
    }, [editMode, task]);

    // write to data
    const handleChange = (name: string, value: string | number ) => {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSliderChange = (value: number) => {
      let truncatedValue = Math.floor(value);
      if (value > truncatedValue + 0.5) {
        truncatedValue += 1;
      }
      handleChange("priority", truncatedValue);
    };

    const handleSave = async () => {
      try {
        if (editMode && task) {
          const response = await taskStore.editTask(task.id, data);
          if (response.message === "Task updated successfully") {
            await taskStore.loadTasks(); // Refetch 
          }
        } else {
          await taskStore.addTask(data);
          await taskStore.loadTasks(); // Refetch 
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
              <Text style={styles.title}>{mode} task</Text>
              <Text style={styles.discriptionText}>Title: </Text>
              <TextInput
                style={styles.input_title}
                placeholder="Enter Task Title"
                value={data.title}
                onChangeText={(value) => handleChange("title", value)}
              />
              <Text style={styles.discriptionText}>Discription: </Text>
              <TextInput
                style={styles.input_description}
                placeholder="Enter multiline text here"
                multiline={true}
                numberOfLines={4}
                value={data.description}
                onChangeText={(value) => handleChange("description", value)}
              />
              <Text style={styles.discriptionText}>Due Date: </Text>
              <DateTimePicker
                style={{ alignSelf: "center" }}
                value={date || initialDate}
                mode="date"
                display="default"
                is24Hour={true}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                    handleChange("due_date", selectedDate.toISOString());
                  } else {
                    setDate(undefined);
                    handleChange("due_date", "");
                  }
                }}
              />
              <Text style={styles.discriptionText}>Priority: {data.priority}</Text>
              <Slider
                style={{ width: 200, height: 40, alignSelf: "center" }}
                minimumValue={0}
                maximumValue={3}
                step={0.1}
                value={data.priority}
                onValueChange={handleSliderChange}
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
    textTransform: "capitalize",
    margin: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  discriptionText: {
    marginLeft: 20,
    marginBottom: 3,
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
