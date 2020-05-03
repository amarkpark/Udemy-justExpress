const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cParse = require("cookie-parser");

app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cParse());

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "Denied!";
  } else { res.locals.msg = ""; }
  next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.send("Is there anybody listening?");
})
app.get("/login", (req, res, next) => {
  console.log(req.query);
  res.render("login");
})
app.get("/welcome", (req, res, next) => {
  // const username = res.body.username;
  res.render("welcome", {username: req.cookies.username});
})
app.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.redirect("/login"); 
})

app.post("/process_login", (req, res, next) => {
  // res.json({Test: "1,2"});
  const username = req.body.username;
  const password = req.body.password;
  // res.json(req.body);
  
  if (password === "xxx") {
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail");
  }
})

app.listen(3333);
console.log("listening on port 3333...");