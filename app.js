require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");
const orderPaymentRouter = require("./routes/orderPayments");
const paymentRouter = require("./routes/payments");
const mediaRouter = require("./routes/media");
const refreshTokenRouter = require("./routes/refreshToken");
const mentorsRouter = require("./routes/mentors");
const chaptersRouter = require("./routes/chapters");
const lessonsRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const reviewsRouter = require("./routes/reviews");
const webhookRouter = require("./routes/webhook");
const myCourseRouter = require("./routes/myCourses");

const verifyToken = require("./middlewares/verifyToken");
const can = require("./middlewares/permission");

const app = express();
var allowedOrigins = ["http://localhost:3000", "*"];

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", courseRouter);
app.use("/mentors", verifyToken, can("admin"), mentorsRouter);
app.use("/chapters", verifyToken, can("admin"), chaptersRouter);
app.use("/lessons", verifyToken, can("admin"), lessonsRouter);
app.use("/orders", verifyToken, can("admin", "student"), orderPaymentRouter);
app.use("/payments", paymentRouter);
app.use("/media", verifyToken, can("admin", "student"), mediaRouter);
app.use("/refresh-tokens", refreshTokenRouter);
app.use("/image-courses", verifyToken, can("admin"), imageCoursesRouter);
app.use("my-courses", verifyToken, can("admin", "student"), myCourseRouter);
app.use("/reviews", verifyToken, can("admin", "student"), reviewsRouter);
app.use("/webhook", webhookRouter);

module.exports = app;
