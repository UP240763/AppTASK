import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import TaskView from "../../components/TaskView";
import { getTask } from "../../services/taskApi";
import { Task } from "../../types/task";

export default function TaskScreen() {
    const { id } = useLocalSearchParams();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) getTask(Number(id)).then(setTask);
    }, [id]);

    if (!task) return null;

    return <TaskView task={task} />;
}