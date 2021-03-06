const { Sequelize, DataTypes } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  username: "dbadmin",
  password: "dbadmin",
  database: "url_shortner_db",
});

const URLs = db.define("urls", {
  id: {
    primaryKey: true,
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(7),
    unique: true,
    allowNull: false,
  },
  link: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});
module.exports = {
  db,
  URLs,
};
