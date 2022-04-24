const router = require("express").Router();
const SavesController = require("../controller/SavesController");

router.post("/", SavesController.savePins);


module.exports = router;
