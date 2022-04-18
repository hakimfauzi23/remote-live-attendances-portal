const db = require("../models");
const JobTitle = db.jobTitles;
const Op = db.Sqlize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      success: false,
      message: "Data can not be empty!",
    });

    return;
  }

  const jobTitle = {
    title: req.body.title,
    description: req.body.description,
    divisionId: req.body.divisionId,
  };

  JobTitle.create(jobTitle)
    .then((data) => {
      res.send({
        success: true,
        message: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Job Title.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  JobTitle.findAll({
    where: condition,
    attributes: ["id", "title", "description"],
    include: [
      { association: "division", attributes: ["id", "title", "description"] },
    ],
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
          err.message || "Some error occurred while creating the JobTitle.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  JobTitle.findByPk(id, {
    attributes: ["id", "title", "description"],
    include: [
      { association: "division", attributes: ["id", "title", "description"] },
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
          message: `Cannot find jobTitle with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error retrieving JobTitle with id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  JobTitle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          changes: req.body,
          message: `JobTitle was updated successfully`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update jobTitle, check your input!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message || `Error occured when updating jobTitle`,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  JobTitle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: `JobTitle was deleted successfully!`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot delete JobTitle with id ${id}, check your input`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error occured when deleting jobTitle`,
      });
    });
};
