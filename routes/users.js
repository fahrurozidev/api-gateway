var express = require("express");
var router = express.Router();
const { APP_NAME } = process.env;

const usersHandler = require("./handler/users");

/* GET users listing. */
router.post("/register", usersHandler.register);
router.post("/login", usersHandler.login);

module.exports = router;
