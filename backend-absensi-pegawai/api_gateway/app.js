require("dotenv").config(); // Inisisasi package dotenv

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const employeesRouter = require("./routes/employees");
const divisionsRouter = require("./routes/divisions");
const jobTitlesRouter = require("./routes/jobTitles");
const settingsRouter = require("./routes/settings");
const absencesRouter = require("./routes/absences");

const app = express();

app.use(cors('*'))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/employees", employeesRouter);
app.use("/divisions", divisionsRouter);
app.use("/job-titles", jobTitlesRouter);
app.use("/settings", settingsRouter);
app.use("/absences", absencesRouter);

module.exports = app;
