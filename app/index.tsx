import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskApi";
import { Task } from "../types/task";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
  if (!title.trim() || !description.trim()) {
    alert("Título y descripción son obligatorios");
    return;
  }

  const newTask = await createTask({ title, description });

  setTasks((prev) => [...prev, newTask]);
  setTitle("");
  setDescription("");
};

  return (
  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      backgroundColor: "#f8fafc",
      padding: 20,
    }}
  >
    <Text
      style={{
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 6,
      }}
    >
    Mis tareas
    </Text>

    <Text
      style={{
        color: "#64748b",
        marginBottom: 20,
      }}
    >
      Organiza tu día de forma simple
    </Text>

    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onAdd={handleAddTask}
      />
    </View>

    {tasks.length === 0 ? (
      <View
        style={{
          padding: 30,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#64748b" }}>
          No hay tareas todavía 
        </Text>
      </View>
    ) : (
      tasks.map((task) => (
        <View
          key={task.id}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 12,
            marginBottom: 12,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <TaskCard
            task={task}
            onToggle={() =>
              updateTask(task.id, {
                ...task,
                completed: !task.completed,
              }).then(loadTasks)
            }
            onDelete={() => deleteTask(task.id).then(loadTasks)}
          />
        </View>
      ))
    )}
  </ScrollView>
);
}