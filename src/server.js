const express = require("express");
const { db } = require("./models/db");
const linkRoute = require("./routes/link");
const app = express();

app.use(express.json());

app.use("/api/links", linkRoute);

db.sync({ force: true })
  .then(() => console.log("Table has been created!"))
  .catch((err) => console.error(err));

app.listen(5454);
