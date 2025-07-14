# Study Notion - ED Tech Platform

Study Notion is a comprehensive Education Technology (ED Tech) web application built using the MERN stack. This platform enables instructors to create and manage courses while providing students with an intuitive learning experience.

## 🌟 Features

### User Authentication

- Secure user registration and authentication using JWT (JSON Web Tokens)
- Multiple account types: Student, Instructor, and Admin
- Profile management with ease

### Course Management

- **For Instructors**: Create, edit, and manage courses
- **For Students**: Enroll in courses, access materials, and track progress
- Course categorization system for better organization

### Progress Tracking

- Track student progress in enrolled courses
- View completed lessons and overall course progress
- Quiz and assignment scoring system

### Payment Integration

- Integrated with Razorpay for secure payment processing
- Multiple payment methods supported
- Secure course enrollment payments

### Search Functionality

- Built-in search feature for courses, lessons, and resources
- Quick content discovery and navigation

### Instructor Dashboard

- Comprehensive dashboard with data visualization
- Monitor student enrollment and course performance
- Track income from course sales
- Charts and analytics for better insights

## 🚀 Tech Stack

- **Frontend**: React.js with Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Razorpay Integration
- **Cloud Storage**: Cloudinary (for media files)
- **Email Service**: Gmail SMTP

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sar-thak83/Study-Notion-ED-Tech.git
cd Study-Notion-ED-Tech
```

### 2. Install Dependencies

**Install root dependencies:**

```bash
npm install
```

**Install server dependencies:**

```bash
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Server Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
# JWT Configuration
JWT_SECRET="your-jwt-secret-key"

# File Upload Configuration
FOLDER_NAME="study-notion-uploads"

# Razorpay Configuration (for payments)
RAZORPAY_SECRET="your-razorpay-secret-key"
RAZORPAY_KEY="your-razorpay-key"

# Cloudinary Configuration (for media storage)
CLOUD_NAME="your-cloudinary-cloud-name"
API_KEY="your-cloudinary-api-key"
API_SECRET="your-cloudinary-api-secret"

# Database Configuration
MONGODB_URL="your-mongodb-connection-string"

# Server Configuration
PORT=4000

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-email-app-password"
```

#### Root Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend API Base URL
VITE_BASE_URL=http://localhost:4000/api/v1
```

### 4. Database Setup

1. Create a MongoDB database (local or cloud)
2. Add the connection string to `MONGODB_URL` in server `.env`
3. The application will automatically create required collections

### 5. Third-Party Service Setup

#### Razorpay Setup

1. Create an account at [Razorpay](https://razorpay.com/)
2. Get your Key ID and Secret from the dashboard
3. Add them to your server `.env` file

#### Cloudinary Setup

1. Create an account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your server `.env` file

#### Gmail SMTP Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an app password for your application
3. Use your email and app password in the server `.env` file

## 🏃‍♂️ Running the Application

### Available Scripts

**Run both servers together:**

```bash
npm run start
```

This command will:

- Start the backend server on `http://localhost:4000`
- Start the frontend development server on `http://localhost:5173`
- Open your browser automatically

**Run only frontend:**

```bash
npm run dev
```

This starts only the frontend development server.

**Run only backend:**

```bash
cd server
node index.js
```

This starts only the backend server.

## 🔧 Initial Setup Instructions

### Creating Categories (Important)

Before adding courses, you must create categories:

1. **Create an Admin Account**:

   - Sign up with a regular account (Student or Instructor)
   - Go to your MongoDB database
   - Find the user in the `users` collection
   - Change the `accountType` field to `"Admin"`

2. **Add Categories**:
   - Login with your Admin account
   - Navigate to Dashboard → Admin Panel
   - Create categories (e.g., "Web Development", "Python", "Data Science")
   - Categories are required before courses can be added

### Account Types

- **Student**: Can enroll in courses, track progress, make payments
- **Instructor**: Can create courses, manage content, view analytics
- **Admin**: Can manage categories, oversee platform operations

## 📁 Project Structure

```
Study-Notion-master/
├── public/               # Static files
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   └── .env              # Backend environment variables
├── server/               # Backend source code
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Server utilities
├── .env                  # Frontend environment variables
└── README.md             # This file
```

## 🌐 API Endpoints

The backend API runs on `http://localhost:4000/api/v1`

Main endpoint categories:

- `/auth` - Authentication routes
- `/courses` - Course management
- `/payment` - Payment processing
- `/profile` - User profile management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is intended as a learning tool and can be used as a sample project for educational or personal projects.

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Change the PORT in server/.env to a different value
   - Kill any processes using port 4000: `lsof -ti:4000 | xargs kill -9`

2. **Database Connection Issues**

   - Verify MongoDB is running
   - Check MONGODB_URL format
   - Ensure network access if using MongoDB Atlas

3. **Payment Integration Issues**

   - Verify Razorpay credentials
   - Check if Razorpay is configured for your region

4. **Email Not Sending**
   - Ensure Gmail app password is correct
