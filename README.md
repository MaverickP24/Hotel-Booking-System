# 🏨 ApnaStays - Hotel Booking System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) hotel booking application with custom JWT authentication, allowing users to browse hotels, view room details, and make bookings.

---

## 🌐 Live Deployment

- **Frontend (Vercel)**: [YOUR_VERCEL_URL_HERE](YOUR_VERCEL_URL_HERE)
- **Backend (Render)**: [https://hotel-booking-system-rv34.onrender.com](https://hotel-booking-system-rv34.onrender.com)
- **API Health Check**: [https://hotel-booking-system-rv34.onrender.com/api/health](https://hotel-booking-system-rv34.onrender.com/api/health)
- **GitHub Repository**: [YOUR_GITHUB_REPO_URL_HERE](YOUR_GITHUB_REPO_URL_HERE)

> **Note**: Replace `YOUR_VERCEL_URL_HERE` with your actual Vercel deployment URL and `YOUR_GITHUB_REPO_URL_HERE` with your GitHub repository URL.

---

## 📋 Project Proposal

### **Problem Statement**
Finding and booking hotels online can be overwhelming with scattered information and complex booking processes. Users need a streamlined platform that offers:
- Easy hotel and room browsing
- Transparent pricing
- Secure authentication
- Simple booking management

### **Solution**
ApnaStays is a modern hotel booking platform that provides:
- **User-friendly Interface**: Clean, responsive design for seamless browsing
- **Secure Authentication**: Custom JWT-based authentication with password hashing
- **Comprehensive Search**: Filter hotels by city, price, room type, and amenities
- **Booking Management**: Users can view, track, and manage their bookings
- **Role-based Access**: Different features for regular users and hotel owners

### **Target Audience**
- Travelers looking for accommodation
- Hotel owners wanting to list their properties
- Business travelers needing quick booking solutions

---

## ✨ Features

### **User Features**
- ✅ Custom signup/login with JWT authentication
- ✅ Browse hotels and rooms with advanced filters
- ✅ View detailed room information with image galleries
- ✅ Search by city, price range, room type, and amenities
- ✅ Make and manage bookings
- ✅ View booking history with status tracking
- ✅ Cancel bookings
- ✅ Featured hotels section
- ✅ Responsive design for all devices

### **Hotel Owner Features**
- ✅ Dashboard to manage hotels and rooms
- ✅ Add/edit/delete hotels
- ✅ Add/edit/delete rooms
- ✅ View booking statistics
- ✅ Track revenue

### **Security Features**
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication (30-day expiry)
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Input validation and sanitization

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Context API** - State management
- **Fetch API** - HTTP requests

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📁 Project Structure

```
HotelBooking/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Hotel.js              # Hotel schema
│   │   ├── Room.js               # Room schema
│   │   └── Booking.js            # Booking schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── user.js               # User routes
│   │   ├── hotel.js              # Hotel routes
│   │   ├── room.js               # Room routes
│   │   └── booking.js            # Booking routes
│   ├── server.js                 # Express server setup
│   ├── package.json              # Backend dependencies
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── assets/               # Images, icons, dummy data
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── UserButton.jsx
│   │   │   └── HotelCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Hotels.jsx
│   │   │   ├── Rooms.jsx
│   │   │   ├── RoomDetails.jsx
│   │   │   ├── Featured.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── About.jsx
│   │   │   └── OwnerDashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js            # API utility functions
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
│
└── README.md                     # Project documentation
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/hotel-booking-system.git
cd hotel-booking-system
```

### **2. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to `.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/hotelbooking
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

```bash
# Start MongoDB (if running locally)
mongod

# Start backend server
npm start
```

Backend will run on `http://localhost:5001`

### **3. Frontend Setup**

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`
