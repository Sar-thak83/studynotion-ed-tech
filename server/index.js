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

// CORS Configuration for Docker
const corsOptions = {
  origin: [
    "http://localhost:3000", // Frontend container
    "http://localhost:5173", // Development
    "http://frontend:80", // Docker internal network
    process.env.STUDY_NOTION_FRONTEND_SITE, // From env variable
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  optionsSuccessStatus: 200,
};

// Connect to database and Cloudinary
connectDB();
cloudinaryConnect();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));

// Health Check Endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "StudyNotion Backend",
    environment: process.env.NODE_ENV || "development",
  });
});

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

app.use(errorHandler); // jaruri hai route ke baad use karna

app.get("/", (req, res) => {
  res.json({
    message: "StudyNotion API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Graceful shutdown for Docker
process.on("SIGTERM", () => {
  clgDev("SIGTERM received, shutting down gracefully");
  server.close(() => {
    clgDev("Process terminated");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  clgDev("SIGINT received, shutting down gracefully");
  server.close(() => {
    clgDev("Process terminated");
    process.exit(0);
  });
});

const server = app.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    clgDev("Error occurred creating server");
    process.exit(1);
  }
  clgDev(`Server is running on ${PORT}`.yellow.underline.bold);
});
