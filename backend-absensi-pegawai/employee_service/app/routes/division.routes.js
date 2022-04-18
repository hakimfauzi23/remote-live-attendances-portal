module.exports = (app) => {
  const divisions = require("../controllers/divisionController");
  var router = require("express").Router();

  router.post("/", divisions.create);

  router.get("/", divisions.findAll);

  router.get("/:id", divisions.findOne);

  router.put("/:id", divisions.update);

  router.delete("/:id", divisions.delete);

  app.use("/api/divisions", router);
};
