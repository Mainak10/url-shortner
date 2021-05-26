const { Router } = require("express");

const route = Router();

route.get("/", (req, res) => {
  res.send("This works!");
});

module.exports = route;
