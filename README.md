# PostSpace

PostSpace is a full-stack platform for creating, sharing, and managing posts with categories. The backend is built with Node.js and Express, uses MongoDB as the database, JWT for authentication. The frontend is built with React + TypeScript + Material UI.

## 🌟 Features

✅ **User Authentication** - JWT-based login/register
✅ **Posts CRUD** - Create, read, update, delete posts
✅ **Comments System** - Add, view, and delete comments
✅ **Like System** - Like/unlike posts with counters
✅ **Search Functionality** - Search posts by title/content
✅ **Responsive Design** - Mobile-first Material UI interface
✅ **Protected Routes** - Authentication-based access control
✅ **Token Refresh** - Automatic JWT refresh mechanism

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Installation & Setup](#backend-installation--setup)
- [Frontend Installation & Setup](#frontend-installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

---

## 🔧 Prerequisites

Before getting started, make sure you have installed:

- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher)
- **MongoDB** (local or cloud - MongoDB Atlas)

Verify the versions:
```bash
node --version
npm --version
```

---

## 📥 Backend Installation & Setup

### 1. Navigate to Backend folder

```bash
cd Fullstack-Project/Backend
```

### 2. Install dependencies

```bash
npm install
```

This will install: Express, Mongoose, JWT, bcryptjs, validation, CORS, Swagger, etc.

### 3. Create `.env` file

Create a `.env` file in `Backend/` folder:

```env
# Server port
PORT=3001

# MongoDB
MONGODB_URI=mongodb://localhost:27017/postspace
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/postspace?retryWrites=true&w=majority

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your_very_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_very_secure_refresh_secret_key

# Frontend URL (for CORS)
PWA_URL=http://localhost:5173

# Swagger
SWAGGER_SERVER_URL=http://localhost:3001
```

### 4. Generate JWT Secrets

Run this command to generate secure random keys:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run it twice to get two different keys for `JWT_SECRET` and `JWT_REFRESH_SECRET`.

---

## 📥 Frontend Installation & Setup

### 1. Navigate to Frontend folder

```bash
cd Fullstack-Project/Frontend
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

Dependencies include: React 19, TypeScript, Material UI, Axios, React Router, Emotion

### 3. Configuration

The API base URL is already configured to `http://localhost:3001/api` in `src/services/api.ts`

If you need to change it, edit:
```typescript
// src/services/api.ts
const API_BASE_URL = 'http://localhost:3001/api';
```

---

## 🚀 Running the Application

### Start Backend Server

```bash
cd Backend
npm start
```

✅ Backend will run on: `http://localhost:3001`

**Verify backend is working:**
- Visit `http://localhost:3001/` - should show "¡Hi API PostSpace!"
- Visit `http://localhost:3001/swagger` - API documentation

**Database Seeders:** When the backend starts, it automatically runs two seeders:
- 🌱 **Categories Seeder** - Creates 8 default categories (Technology, Travel, Food, etc.) if they don't exist
- 👤 **Admin Seeder** - Creates a default admin user if none exists

### Start Frontend Development Server

In a new terminal:

```bash
cd Frontend
npm run dev
```

✅ Frontend will open at: `http://localhost:5173` (usually automatic)

---

## 🔐 Default Admin Credentials

Once both servers are running, you can test the application with the default admin account:

```
📧 Email: admin@postspace.com
🔑 Password: Admin@123456
```

The admin user is created automatically on the first backend startup. Use these credentials to:
- Login to the application
- Access admin features
- Manage posts, users, and categories

---

## ✅ Testing the Application

1. **Login as Admin:**
   - Go to `http://localhost:5173/login`
   - Enter: `admin@postspace.com` / `Admin@123456`
   - You'll be redirected to the home page (`/`)

2. **View API Documentation:**
   - Visit `http://localhost:3001/swagger`
   - Explore all available endpoints with interactive API testing

3. **Create a New Account:**
   - Go to `http://localhost:5173/register`
   - Fill in the registration form
   - New users are created with `host` role by default
   - After registration, login with your new account

4. **Test Features:**
   - Create, edit, and delete posts
   - Browse posts by category
   - Add and view comments
   - Like/unlike posts
   - Search for posts

---

## 🎨 Technology Stack

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Swagger** - API documentation

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Material UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Router** - Navigation
- **Vite** - Build tool

---

## 👨‍💻 Author

Carlos Ivan Macias Padilla - Fullstack Developer

Last updated: March 2026