import { Task } from "../types/task";

const API_BASE = "http://192.168.1.60:3000/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Error al obtener tarea");
  return res.json();
}

export async function createTask(
  payload: Pick<Task, "title" | "description">,
): Promise<Task> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, completed: false }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
}

export async function updateTask(
  id: number,
  payload: Partial<Task>,
): Promise<Task> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al actualizar tarea");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al borrar tarea");
}
