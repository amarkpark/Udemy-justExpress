const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet()); // express security best practice vulnerability protection

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/ajax", (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.json("Check 1, 2")
})


app.listen(3333);