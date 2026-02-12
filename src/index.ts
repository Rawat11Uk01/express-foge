import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.end("i am data again");
});

app.listen(3000, () => {
  console.log("hey i am listening to 3000");
});
