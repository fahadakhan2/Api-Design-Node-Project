import express from "express";
import router from "./router";

const app = express();

// respond to a get request with a route of /
// app.[method]([route], [route handler]) is the syntax
app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", router);

export default app;
