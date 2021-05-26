const express = require("express");
const { db } = require("./models/db");
const linkRoute = require("./routes/link");
const app = express();

app.listen(5454, () => {
  console.log(`App is listening!`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the URL shortner Page!");
});

app.use("/api/links", linkRoute);

db.sync()
  .then(() => console.log("Table has been created!"))
  .catch((err) => console.error(err));
