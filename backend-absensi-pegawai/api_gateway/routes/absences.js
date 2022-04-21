const express = require("express");
const router = express.Router();

const absencesHandler = require("./handler/absences");
router.post("/clock-in", absencesHandler.clockIn);
router.put("/clock-out", absencesHandler.clockOut);
router.get("/", absencesHandler.getAll);
router.get("/employee", absencesHandler.getByEmployee);

module.exports = router;
