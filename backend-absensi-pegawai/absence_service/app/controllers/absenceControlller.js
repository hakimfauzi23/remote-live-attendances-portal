const db = require("../models");
const Absence = db.absences;
const Op = db.Sqlize.Op;
const SQL = db.Sqlize;

// Pagination Stuffs
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: absences } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, absences, totalPages, currentPage };
};

// Do Absence
exports.create = (req, res) => {
  if (!req.body.employee_id) {
    res.status(400).send({
      message: "employee_id can not be empty!",
    });
    return;
  }
  const absence = {
    employee_id: req.body.employee_id,
    date: req.body.date,
    clock_in: req.body.clock_in,
    clock_out: req.body.clock_out,
    loc_in: req.body.loc_in,
    loc_out: req.body.loc_out,
  };

  Absence.create(absence)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while absence.",
      });
    });
};

exports.findAll = (req, res) => {
  let month = req.query.month ?? new Date().getMonth() + 1;
  let year = req.query.year ?? new Date().getFullYear();
  Absence.findAll({
    where: {
      date: SQL.where(SQL.fn("MONTH", SQL.col("date")), parseInt(month)),
      [Op.and]: SQL.where(SQL.fn("YEAR", SQL.col("date")), parseInt(year)),
    },
  })
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while retrieving absence.",
      });
    });
};

exports.findByEmployee = (req, res) => {
  let month = req.query.month ?? new Date().getMonth() + 1;
  let year = req.query.year ?? new Date().getFullYear();
  let employee_id = req.query.employee_id;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  if (!employee_id) {
    res.status(400).send({
      success: false,
      message: "Employee ID Needed!",
    });
    return;
  }
  Absence.findAndCountAll({
    where: {
      date: SQL.where(SQL.fn("MONTH", SQL.col("date")), parseInt(month)),
      [Op.and]: SQL.where(SQL.fn("YEAR", SQL.col("date")), parseInt(year)),
      employee_id: employee_id,
    },
    order: [["date", "DESC"]],
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
      // res.send({
      //   success: true,
      //   data: data,
      // });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message ||
          "Some error occurred while retrieving employee absences.",
      });
    });
};
