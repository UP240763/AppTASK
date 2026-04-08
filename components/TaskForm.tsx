import React from "react";
import { Button, TextInput, View } from "react-native";

type Props = {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onAdd: () => void;
};

export default function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  onAdd,
}: Props) {
  return (
    <View style={{ gap: 10, marginBottom: 20 }}>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Agregar tarea" onPress={onAdd} />
    </View>
  );
}