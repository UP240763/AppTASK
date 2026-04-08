import React from "react";
import { Text, View } from "react-native";
import { Task } from "../types/task";

type Props = {
    task: Task;
};

export default function TaskView({ task }: Props) {
    return (
        <View style={{ padding: 20 }}>
            <Text style={{
                fontSize: 28,
                textDecorationLine: task.completed ? "line-through" : "none",
                color: task.completed ? "#94a3b8" : "#000",
            }}
            >{task.title}</Text>
            <Text>ID: {task.id}</Text>
            <Text>{task.description}</Text>
            <Text>
                Estado: {task.completed ? "Completada" : "Pendiente"}
            </Text>
        </View>
    );
}