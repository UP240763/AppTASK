import { router } from "expo-router";
import React from "react";
import { Button, Switch, Text, View } from "react-native";
import { Task } from "../types/task";

type Props = {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
};

export default function TaskCard({
    task,
    onToggle,
    onDelete,
}: Props) {
    return (
        <View style={{ borderWidth: 1, padding: 12, marginBottom: 10 }}>
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>

            <Switch value={task.completed} onValueChange={onToggle} />

            <Button
                title="Ver"
                onPress={() => router.push(`/task/${task.id}`)}
            />

            <Button
                title="Editar"
                onPress={() => router.push(`/task/edit/${task.id}`)}
            />

            <Button title="Borrar" onPress={onDelete} />
        </View>
    );
}