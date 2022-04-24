const router = require("express").Router();
const CommentsController = require("../controller/CommentsController");

router.get("/", CommentsController.getAll)
      .post("/", CommentsController.createCmt);

module.exports = router;
