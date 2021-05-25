const express = require("express");
const { db } = require("./models/db");
const app = express();

app.listen(8080, () => {
  console.log(`App is listening!`);
});

db.authenticate()
  .then(() => console.log("db works!"))
  .catch((err) => console.error(err));
