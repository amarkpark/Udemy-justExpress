const express = require("express");
const app = express();

app.all("*", (req, res) => {
  res.send("<h2 style='color:blue'>This is express Server</h2>");
})

app.listen(3333);