import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => onToggleTask(task.id)}>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completedText,
          ]}
        >
          {task.text}
        </Text>
      </TouchableOpacity>
      <Text style={styles.category}>{task.category}</Text>
      <Text style={styles.priority}>{task.priority}</Text>
      <TouchableOpacity onPress={() => onDeleteTask(task.id)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  category: {
    marginLeft: 10,
    color: "blue",
  },
  priority: {
    marginLeft: 10,
    color: "green",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
