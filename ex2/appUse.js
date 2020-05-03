const express = require("express");
const app = express();


function validateUser (req, res, next) {
  res.locals.validated = true;
  console.info("\x1b[1m%s\x1b[0m","appUse Validate User ran");
  next();
}

app.use("/admin", validateUser);

app.get("/", (req, res, next) => {
  res.send("appUse <h1>Main Page</h1>");
  console.info("\x1b[1m%s\x1b[0m", "validated: "+res.locals.validated);
})

app.get("/admin", (req, res, next) => {
  res.send("appUse <h1>Admin Page</h1>");
  console.info("\x1b[1m%s\x1b[0m", "validated: "+res.locals.validated);
})

app.listen(3333);