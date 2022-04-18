const dbConfig = require("../config/db.config");
const Sqlize = require("sequelize");

const sequelize = new Sqlize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

// Get Sequelize module
db.Sqlize = Sqlize;

db.sequelize = sequelize;

// Models
db.absences = require("./absence")(sequelize, Sqlize);

// Relations division -> job title

module.exports = db;
