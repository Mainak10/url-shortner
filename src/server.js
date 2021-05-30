const express = require("express");
const { db } = require("./models/db");
const linkRoute = require("./routes/link");
const redirectRoute = require("./routes/redirect");
const app = express();

/** Parses incoming json */
app.use(express.json());

/** Initial load */
app.get("/", (req, res) => {
  res.send(
    "<h4>Welcome to URL shortner!</h4></br> <p>/api/links ==> Add link and code (option) in the body </p> </br> <p> Try with generated short /code </p>"
  );
});
/** Avoid default request for favicon */
app.get("/favicon.ico", (req, res) => {
  res.sendStatus(204);
});
app.use("/api/links", linkRoute);
app.use("/", redirectRoute);

db.sync() // Note:: If there is any change in the db schema add {force:true} strictly for dev env
  .then(() => console.log("Table has been created!"))
  .catch((err) => console.error(err));

app.listen(5454);
