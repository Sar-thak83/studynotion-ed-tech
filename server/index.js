// const express = require("express");
// const app = express();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
// const database = require("./confiq/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { cloudinaryConnect } = require("./confiq/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// //database connect kiya hai
// database.connect();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );
// //cloudinary connection kiya hai
// cloudinaryConnect();

// //routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and running....",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`App is running at ${PORT}`);
// });

const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const clgDev = require("./utils/clgDev");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const cloudinaryConnect = require("./config/cloudinaryConnect");

dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 11000;
const app = express();
connectDB();
cloudinaryConnect();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
const AuthR = require("./routes/AuthR");
const CategoryR = require("./routes/CategoryR");
const CourseProgressR = require("./routes/CourseProgressR");
const CourseR = require("./routes/CourseR");
const PaymentR = require("./routes/PaymentR");
const ProfileR = require("./routes/ProfileR");
const ReviewR = require("./routes/ReviewR");
const SectionR = require("./routes/SectionR");
const SubSectionR = require("./routes/SubSectionR");
const UserR = require("./routes/UserR");
const OtherR = require("./routes/OtherR");

app.use("/api/v1/auth", AuthR);
app.use("/api/v1/categories", CategoryR);
app.use("/api/v1/courses", CourseR);
app.use("/api/v1/payments", PaymentR);
app.use("/api/v1/profiles", ProfileR);
app.use("/api/v1/reviews", ReviewR);
app.use("/api/v1/sections", SectionR);
app.use("/api/v1/subsections", SubSectionR);
app.use("/api/v1/users", UserR);
app.use("/api/v1/other", OtherR);
app.use("/api/v1/courseprogress", CourseProgressR);

app.use(errorHandler); // must be after mounting the routes

app.get("/", (req, res) => {
  res.send("Hello ji");
});

app.listen(PORT, (err) => {
  if (err) {
    clgDev("Error occurred creating server");
    process.exit();
  }
  clgDev(`Server in running on ${PORT}`.yellow.underline.bold);
});

// TODO : check for these, what it is
/**
 * // handle unhandled promise rejection
 * process.on("unhandledRejection", (err, promise) => {
 *  clgDev(`Error : ${err.message}`.red);
 *  // close server & exit process
 *  server.close(()=>process.exit(1));
 * });
 */
