const express = require("express");
const router = express.Router();

const jobTitlesHandler = require("./handler/jobTitles");
router.post("/", jobTitlesHandler.create);
router.get("/", jobTitlesHandler.getAll);
router.get("/:id", jobTitlesHandler.get);
router.put("/:id", jobTitlesHandler.update);
router.delete("/:id", jobTitlesHandler.destroy);

module.exports = router;
