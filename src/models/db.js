const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  username: "dbadmin",
  password: "dbadmin",
  database: "url_shortner_db",
});

module.exports = {
  db,
};
