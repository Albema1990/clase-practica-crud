import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Invalid task id" });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!updateTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updateTask);
  } catch (error) {
    res.status(400).json({ error: "Invalid task id" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ error: "Invalid task id" });
  }
};
