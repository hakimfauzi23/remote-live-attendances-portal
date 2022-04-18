const db = require("../models");
const Division = db.divisions;
const Op = db.Sqlize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      success: false,
      message: "Cannot can not be empty!",
    });

    return;
  }

  const division = {
    title: req.body.title,
    description: req.body.description,
  };

  Division.create(division)
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
          err.message || "Some error occurred while creating the Division.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Division.findAll({
    where: condition,
    attributes: ["id", "title", "description"],
    include: [
      { association: "jobTitles", attributes: ["id", "title", "description"] },
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
          err.message || "Some error occurred while get all the Division.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Division.findByPk(id, {
    attributes: ["id", "title", "description"],
    include: [
      { association: "jobTitles", attributes: ["id", "title", "description"] },
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
          message: `Cannot find division with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error retrieving Division with id: ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Division.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          changes: req.body,
          message: `Division was updated successfully`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot update division, check your input!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: true,
        message: err.message || `Error occured when updating division`,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  Division.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: `Division was deleted successfully!`,
        });
      } else {
        res.send({
          success: false,
          message: `Cannot delete Division with id ${id}, check your input`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: `Error occured when deleting division`,
      });
    });
};
