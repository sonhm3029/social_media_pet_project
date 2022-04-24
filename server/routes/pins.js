const express = require("express");
const router = express.Router();
const PinsController = require("../controller/PinsController");

router.get("/", PinsController.getPins)
    .post("/", PinsController.createPin);

router.delete("/:id", PinsController.deletePin)
      .get("/:id", PinsController.getPins)


module.exports = router;
