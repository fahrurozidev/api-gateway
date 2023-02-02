require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");
const orderRouter = require("./routes/orders");
const paymentRouter = require("./routes/payments");
const mediaRouter = require("./routes/media");
const refreshTokenRouter = require("./routes/refreshToken");
const mentorsRouter = require("./routes/mentors");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");

const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", courseRouter);
app.use("/mentors", verifyToken, mentorsRouter);
app.use("/chapters", verifyToken, chaptersRouter);
app.use("/lessons", verifyToken, lessonsRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);
app.use("/media", mediaRouter);
app.use("/refresh-tokens", refreshTokenRouter);

module.exports = app;
