const express = require("express");
const router = express.Router();

const employeesHandler = require("./handler/employees");
router.post("/", employeesHandler.create);
router.get("/", employeesHandler.getAll);
router.get("/:id", employeesHandler.get);
router.put("/:id", employeesHandler.update);
router.delete("/:id", employeesHandler.destroy);

module.exports = router;
