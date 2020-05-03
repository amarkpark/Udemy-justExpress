const express = require("express");
const app = express();
const helmet = require("helmet");
const path = require("path");

app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("index", {
    noodle1: "spaghetti",
    noodle2: "ramen",
    noodle3: "pool float"
  });
})

app.listen(3333);