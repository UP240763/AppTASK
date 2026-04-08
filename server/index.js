const express = require("express");
const connection = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// ✅ GET todas las tareas
app.get("/api/tasks", (req, res) => {
    connection.query("SELECT * FROM tasks", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const tasks = results.map((task) => ({
            ...task,
            completed: !!task.completed,
        }));

        res.json(tasks);
    });
});


// ✅ GET una tarea por id
app.get("/api/tasks/:id", (req, res) => {
    connection.query(
        "SELECT * FROM tasks WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: "Tarea no encontrada",
                });
            }

            res.json({
                ...results[0],
                completed: !!results[0].completed,
            });
        }
    );
});


// ✅ POST crear tarea
app.post("/api/tasks", (req, res) => {
    const { title, description, completed = false } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            error: "title y description son obligatorios",
        });
    }

    connection.query(
        "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
        [title, description, completed],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            connection.query(
                "SELECT * FROM tasks WHERE id = ?",
                [result.insertId],
                (err2, rows) => {
                    if (err2) {
                        return res.status(500).json({ error: err2.message });
                    }

                    res.status(201).json({
                        ...rows[0],
                        completed: !!rows[0].completed,
                    });
                }
            );
        }
    );
});


// ✅ PUT actualizar tarea
app.put("/api/tasks/:id", (req, res) => {
    const { title, description, completed } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            error: "title y description son obligatorios",
        });
    }

    connection.query(
        "UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
        [title, description, completed, req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Tarea no encontrada",
                });
            }

            connection.query(
                "SELECT * FROM tasks WHERE id = ?",
                [req.params.id],
                (err2, rows) => {
                    if (err2) {
                        return res.status(500).json({ error: err2.message });
                    }

                    res.json({
                        ...rows[0],
                        completed: !!rows[0].completed,
                    });
                }
            );
        }
    );
});


// ✅ DELETE tarea
app.delete("/api/tasks/:id", (req, res) => {
    connection.query(
        "DELETE FROM tasks WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Tarea no encontrada",
                });
            }

            res.sendStatus(204);
        }
    );
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});