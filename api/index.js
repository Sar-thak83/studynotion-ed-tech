const path = require('path');

// Set up environment
require('dotenv').config({ path: path.join(__dirname, '../server/config/.env') });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// Create Express app
const app = express();

// Connect to database and Cloudinary
const connectDB = require('../server/config/database');
const cloudinaryConnect = require('../server/config/cloudinaryConnect');
const errorHandler = require('../server/middlewares/errorHandler');

// Connect services
connectDB();
cloudinaryConnect();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {th
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel preview and production URLs
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.STUDY_NOTION_FRONTEND_SITE,
    ].filter(Boolean);
    
    // Allow any Vercel deployment URL
    if (origin.includes('vercel.app') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
const AuthR = require('../server/routes/AuthR');
const CategoryR = require('../server/routes/CategoryR');
const CourseProgressR = require('../server/routes/CourseProgressR');
const CourseR = require('../server/routes/CourseR');
const PaymentR = require('../server/routes/PaymentR');
const ProfileR = require('../server/routes/ProfileR');
const ReviewR = require('../server/routes/ReviewR');
const SectionR = require('../server/routes/SectionR');
const SubSectionR = require('../server/routes/SubSectionR');
const UserR = require('../server/routes/UserR');
const OtherR = require('../server/routes/OtherR');

// Mount routes
app.use('/api/v1/auth', AuthR);
app.use('/api/v1/categories', CategoryR);
app.use('/api/v1/courses', CourseR);
app.use('/api/v1/payments', PaymentR);
app.use('/api/v1/profiles', ProfileR);
app.use('/api/v1/reviews', ReviewR);
app.use('/api/v1/sections', SectionR);
app.use('/api/v1/subsections', SubSectionR);
app.use('/api/v1/users', UserR);
app.use('/api/v1/other', OtherR);
app.use('/api/v1/courseprogress', CourseProgressR);

// Error handler
app.use(errorHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'StudyNotion Backend',
    cors: 'enabled'
  });
});

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'StudyNotion API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

module.exports = app;
