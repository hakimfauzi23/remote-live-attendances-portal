const db = require("../models");
const Setting = db.setting;
const Op = db.Sequelize.Op;
// create new setting
exports.create = (req, res) => {
  // validate
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });

    return;
  }

  const setting = {
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
  };

  Setting.create(setting)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Insert data error!",
      });
    });
};

// get all settings with params(?)
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Setting.findAll({ where: condition })
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Get data error!",
      });
    });
};

// get setting by id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Setting.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({
          success: true,
          data: data,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "Cannot find data!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "find data by id error!",
      });
    });
};

// update setting by id
exports.update = (req, res) => {
  const id = req.params.id;
  Setting.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Setting updated successfully",
        });
      } else {
        res.send({
          success: false,
          message: "Cannot update setting, check your input!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "update data error!",
      });
    });
};

// delete setting by id
exports.delete = (req, res) => {
  const id = req.params.id;
  Setting.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Setting was deleted successfully!",
        });
      } else {
        res.send({
          success: false,
          message: "Cannot delete data, check your input!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Delete data error!",
      });
    });
};
