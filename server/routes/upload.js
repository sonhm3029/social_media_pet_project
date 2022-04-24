const router = require("express").Router();
const UploadController = require("../controller/UploadController");
const multer = require('multer');
// const upload = multer({dest:"uploads"});
const upload = multer();


router.post("/",upload.single('selectedFile') ,UploadController.upload);
router.delete("/:imageId", UploadController.delete);

module.exports = router;
