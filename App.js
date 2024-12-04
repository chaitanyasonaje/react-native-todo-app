import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  Button,
  Text,
} from "react-native-paper";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(DefaultTheme);

  // Load tasks and theme from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark") setTheme(DarkTheme);
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task, category, priority) => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: task, category, priority, completed: false },
    ]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTheme = () => {
    const newTheme = theme === DefaultTheme ? DarkTheme : DefaultTheme;
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme === DarkTheme ? "dark" : "light");
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme === DarkTheme ? "light-content" : "dark-content"}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.toggleText}>
            {theme === DefaultTheme ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </Text>
        </TouchableOpacity>
        <TaskInput onAddTask={addTask} />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleTask={toggleTaskCompletion}
              onDeleteTask={deleteTask}
            />
          )}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: "blue",
  },
});
