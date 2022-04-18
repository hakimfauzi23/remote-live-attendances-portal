const express = require("express");
const router = express.Router();

const absencesHandler = require("./handler/absences");
router.post("/", absencesHandler.create);
router.get("/", absencesHandler.getAll);
router.get("/employee", absencesHandler.getByEmployee);

module.exports = router;
