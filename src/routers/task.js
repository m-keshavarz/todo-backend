const express = require("express");

const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.get("/task", (req, res) => {
  res.send("from the task router");
});

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
