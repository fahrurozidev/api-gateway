var express = require("express");
var router = express.Router();
const { APP_NAME } = process.env;

const verifyToken = require("../middlewares/verifyToken");

const mediaHandler = require("./handler/media");

/* GET users listing. */
router.post("/", mediaHandler.create);
router.get("/", verifyToken, mediaHandler.getAll);
router.delete("/:id", mediaHandler.destroy);

module.exports = router;
