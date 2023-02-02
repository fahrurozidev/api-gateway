var express = require("express");
var router = express.Router();
const { APP_NAME } = process.env;

const orderPaymentRouter = require("./handler/order-payment");

router.get("/", orderPaymentRouter.getOrders);

module.exports = router;
