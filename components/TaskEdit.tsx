import React from "react";
import { Button, TextInput, View } from "react-native";
import { Task } from "../types/task";

type Props = {
    task: Task;
    setTask: (task: Task) => void;
    onSave: () => void;
};

export default function TaskEdit({
    task,
    setTask,
    onSave,
}: Props) {
    return (
        <View style={{ padding: 20, gap: 10 }}>
            <TextInput
                value={task.title}
                onChangeText={(text) =>
                    setTask({ ...task, title: text })
                }
                style={{ borderWidth: 1, padding: 10 }}
            />

            <TextInput
                value={task.description}
                onChangeText={(text) =>
                    setTask({ ...task, description: text })
                }
                style={{ borderWidth: 1, padding: 10 }}
            />

            <Button title="Guardar" onPress={onSave} />
        </View>
    );
}