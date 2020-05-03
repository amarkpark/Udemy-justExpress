const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("public"));

app.listen(3333);

app.all("/", (req, res) => {
  // res.send("<h1>no place like 128.0.0.1</h1>")
  console.log(path.join(__dirname + "/node.html"));
  res.sendFile(path.join(__dirname + "/node.html"));
})

app.get("/", (req, res) => {})
app.post("/", (req, res) => {})
app.delete("/", (req, res) => {})
app.put("/", (req, res) => {})