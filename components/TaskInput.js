import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function TaskInput({ onAddTask }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");

  const handleAddTask = () => {
    if (task.trim()) {
      onAddTask(task, category, priority);
      setTask("");
    } else {
      alert("Task cannot be empty!");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Study" value="Study" />
      </Picker>
      <Picker
        selectedValue={priority}
        onValueChange={(value) => setPriority(value)}
        style={styles.picker}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
});
