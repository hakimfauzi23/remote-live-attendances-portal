module.exports = (app) => {
  const absences = require("../controllers/absenceController");
  var router = require("express").Router();
  router.post("/", absences.create);
  router.get("/", absences.findAll);
  router.get("/employee", absences.findByEmployee);
  router.post("/clock-in", absences.clockIn);
  router.put("/clock-out", absences.clockOut);
  app.use("/api/absences", router);
};
