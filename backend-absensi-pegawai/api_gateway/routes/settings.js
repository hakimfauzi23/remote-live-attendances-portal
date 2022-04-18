const express = require("express");
const router = express.Router();

const settingsHandler = require("./handler/settings");
router.post("/", settingsHandler.create);
router.get("/", settingsHandler.getAll);
router.get("/:id", settingsHandler.get);
router.put("/:id", settingsHandler.update);
router.delete("/:id", settingsHandler.destroy);

module.exports = router;
