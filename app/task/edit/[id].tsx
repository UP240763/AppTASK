import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import TaskEdit from "../../../components/TaskEdit";
import { getTask, updateTask } from "../../../services/taskApi";
import { Task } from "../../../types/task";

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) getTask(Number(id)).then(setTask);
    }, [id]);

    const handleSave = async () => {
        if (!task) return;
        await updateTask(task.id, task);
        router.back();
    };

    if (!task) return null;

    return (
        <TaskEdit
            task={task}
            setTask={setTask}
            onSave={handleSave}
        />
    );
}