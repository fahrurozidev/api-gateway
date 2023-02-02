var express = require("express");
var router = express.Router();
const { APP_NAME } = process.env;

const webhookHandler = require("./handler/webhook");

router.post("/", webhookHandler.webhook);

module.exports = router;
