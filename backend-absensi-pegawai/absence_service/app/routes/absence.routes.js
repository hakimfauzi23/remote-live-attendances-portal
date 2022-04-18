module.exports = (app) => {
  const absences = require("../controllers/absenceControlller");
  var router = require("express").Router();
  router.post("/", absences.create);
  router.get("/", absences.findAll);
  router.get("/employee", absences.findByEmployee);
  app.use("/api/absences", router);
};
