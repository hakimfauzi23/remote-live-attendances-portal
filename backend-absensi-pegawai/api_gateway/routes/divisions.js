const express = require("express");
const router = express.Router();

const divisionsHandler = require("./handler/divisions");
router.post("/", divisionsHandler.create);
router.get("/", divisionsHandler.getAll);
router.get("/:id", divisionsHandler.get);
router.put("/:id", divisionsHandler.update);
router.delete("/:id", divisionsHandler.destroy);

module.exports = router;
