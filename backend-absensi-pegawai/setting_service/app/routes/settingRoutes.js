module.exports = (app) => {
  const settings = require("../controllers/settingController");

  let router = require("express").Router();

  // create setting
  router.post("/", settings.create);

  //get all setting
  router.get("/", settings.findAll);

  //get setting with id
  router.get("/:id", settings.findOne);

  // update setting by id
  router.put("/:id", settings.update);

  // delete setting by id
  router.delete("/:id", settings.delete);

  app.use("/api/settings", router);
};
