import express from "express";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);

app.listen(3000, () => {
  console.log("hello");
});
