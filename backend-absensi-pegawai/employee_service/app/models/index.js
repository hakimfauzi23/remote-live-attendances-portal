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
db.divisions = require("./division")(sequelize, Sqlize);
db.jobTitles = require("./jobTitle")(sequelize, Sqlize);
db.employees = require("./employee")(sequelize, Sqlize);

// Relations division -> job title
db.divisions.hasMany(db.jobTitles, { as: "jobTitles" });
db.jobTitles.belongsTo(db.divisions, {
  foreignKey: "divisionId",
  as: "division",
});

// Relations job title -> employee
db.jobTitles.hasMany(db.employees, { as: "employees" });
db.employees.belongsTo(db.jobTitles, {
  foreignKey: "jobTitleId",
  as: "jobTitles",
});

module.exports = db;
