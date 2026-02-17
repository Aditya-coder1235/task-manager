const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    const task = await Task.create({
        ...req.body,
        user: req.userId
    });
    res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true }
    );
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.userId
    });
    res.json({ message: "Task deleted" });
};
