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
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
