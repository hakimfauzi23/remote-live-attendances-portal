module.exports = (app) => {
    const jobTitles = require("../controllers/jobTitleController");
    var router = require("express").Router();
  
    router.post("/", jobTitles.create);
  
    router.get("/", jobTitles.findAll);
  
    router.get("/:id", jobTitles.findOne);
  
    router.put("/:id", jobTitles.update);
  
    router.delete("/:id", jobTitles.delete);
  
    app.use("/api/job-titles", router);
  };
  