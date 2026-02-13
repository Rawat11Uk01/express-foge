import express from "express";

import * as fs from "node:fs";
import path from "path";
import { Task } from "../types/task";

const tasksRouter = express.Router();

const tasks: Task[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/tasks.json"), "utf-8"),
);

tasksRouter.get("/", (req, resp) => {
  return resp.json(tasks);
});

tasksRouter.post("/", (req, resp) => {
  const data: Task = req.body;
  if (!data.name || !data.type || !data.deadline) {
    return resp.status(400).json({
      status: "Failed",
      message: "Please send all the required fields",
    });
  }

  const taskPayload = {
    ...data,
    id: Math.random(),
    date: new Date().toISOString(),
  };

  const allTasks = [...tasks, taskPayload];

  fs.writeFile(
    path.join(__dirname, "data", "tasks.json"),
    JSON.stringify(allTasks),
    (error) => {
      if (error) {
        resp.status(500).send("Failed to add task");
      }
      resp.end(data);
    },
  );

  resp.status(201).send({
    status: "success",
    data: taskPayload,
  });
});

tasksRouter.patch("/:id", (req, resp) => {
  const taskId = req.params.id;
  const data = req.body;
  if (!data) {
    return resp.status(400).send({
      status: "Failed",
      message: "Please send data to update",
    });
  }
  if (data.id || data.date) {
    return resp.status(400).send({
      status: "Failed",
      message: "You cant update this field",
    });
  }

  const taskToUpdate = tasks.find((t) => t.id == +taskId);

  if (!taskToUpdate) {
    return resp.status(400).send({
      status: "Failed",
      message: "Task  with this id does not exist",
    });
  }

  const updatedTask = { ...taskToUpdate, ...data };
  const allTasks = [...tasks.filter((a) => a.id !== +taskId), updatedTask];
  console.log(updatedTask, allTasks);

  fs.writeFileSync(
    path.join(__dirname, "../data/tasks.json"),
    JSON.stringify(allTasks),
  );

  resp.status(201).send({
    status: "success",
    data: updatedTask,
  });
});

tasksRouter.delete("/:id", (req, resp) => {
  console.log(req.params.id);
  resp.end();
});

export default tasksRouter;
