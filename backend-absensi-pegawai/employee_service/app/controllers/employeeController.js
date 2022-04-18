const db = require("../models");
const Employee = db.employees;
const Op = db.Sqlize.Op;

exports.create = (req, res) => {
  // // Manual Validation
  // const mustAttributes = [
  //   "name",
  //   "address",
  //   "dob",
  //   "phone_number",
  //   "email",
  //   "jobTitlesId",
  // ];
  // mustAttributes.forEach((attr) => {
  //   if (!req.body.attr) {
  //     res.status(400).send({
  //       success: false,
  //       message: `${attr} can not be empty!`,
  //     });
  //   }
  // });

  const employee = {
    name: req.body.name,
    address: req.body.address,
    pob: req.body.pob,
    dob: req.body.dob,
    phone_number: req.body.phone_number,
    email: req.body.email,
    jobTitleId: req.body.jobTitleId,
    avatar: req.body.avatar,
  };

  Employee.create(employee)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message ||
          "Some error occurred while creating the Employee Data.",
      });
    });
};

exports.findAll = (req, res) => {
  let name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Employee.findAll({
    attributes: [
      "id",
      "name",
      "address",
      "pob",
      "dob",
      "phone_number",
      "email",
      "avatar",
    ],
    include: [
      {
        association: "jobTitles",
        attributes: ["title"],
        include: [
          {
            association: "division",
            attributes: ["title"],
          },
        ],
      },
    ],
    where: condition,
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
        message:
          err.message || "Some error occurred while get all the Employee.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Employee.findByPk(id, {
    attributes: [
      "id",
      "name",
      "address",
      "pob",
      "dob",
      "phone_number",
      "email",
      "avatar",
    ],
    include: [
      {
        association: "jobTitles",
        attributes: ["id", "title"],
        include: [
          {
            association: "division",
            attributes: ["id", "title"],
          },
        ],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send({
          success: true,
          data: data,
        });
      } else {
        res.status(404).send({
          success: false,
          message: `Cannot find employee with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error retrieving employee with id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Employee.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          changes: req.body,
          message: `Employee was updated successfully`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update employee, check your input!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message || `Error occured when updating employee`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: `Employee was deleted successfully!`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot delete Employee with id ${id}, check your input`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error occured when deleting Employee`,
      });
    });
};
