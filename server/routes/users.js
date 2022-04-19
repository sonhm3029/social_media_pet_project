const express = require("express");
const router = express.Router();
const UsersController = require("../controller/UsersController");

router.post("/", UsersController.createUser)
      .get("/:id",UsersController.getUser)
      .get("/",UsersController.getUser)

module.exports = router;
