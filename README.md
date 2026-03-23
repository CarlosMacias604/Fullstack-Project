# PostSpace

PostSpace is a full-stack platform for creating, sharing, and managing posts with categories. The backend is built with Node.js and Express, uses MongoDB as the database, and JWT for authentication.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Installation](#backend-installation)
- [Configuration](#configuration)
- [Running](#running)

---

## 🔧 Prerequisites

Before getting started, make sure you have installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud - MongoDB Atlas)

Verify the versions:
```bash
node --version
npm --version
```

---

## 📥 Backend Installation

### 1. Clone or download the project

```bash
cd Fullstack-Project/Backend
```

### 2. Install dependencies

```bash
npm install
```

This will install all the necessary packages listed in `package.json`:
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password encryption
- **jsonwebtoken**: JWT authentication
- **express-validator**: Data validation
- **express-rate-limit**: Request rate limiting
- **swagger-jsdoc** and **swagger-ui-express**: API documentation
- **cors**: Cross-origin access control
- **dotenv**: Environment variables

---

## ⚙️ Configuration

### Create a `.env` file in the `Backend/` folder

```env
# Server port
PORT=3001

# MongoDB
MONGODB_URI=mongodb://localhost:27017/dbPostSpace
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbPostSpace?retryWrites=true&w=majority

# JWT Secrets
JWT_SECRET=your_very_secure_jwt_secret_key
JWT_REFRESH_SECRET=your_very_secure_refresh_secret_key

# Frontend URL (for CORS)
PWA_URL=http://localhost:3000

# Swagger
SWAGGER_SERVER_URL=http://localhost:3001
```

### Generate JWT Secret Keys

To generate secure random keys for `JWT_SECRET` and `JWT_REFRESH_SECRET`, run the following command in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this command twice to get two different keys and paste them into your `.env` file.

### Important Variables:
- `MONGODB_URI`: MongoDB connection
- `JWT_SECRET`: Secret key for signing JWT (use a long random string)
- `JWT_REFRESH_SECRET`: Secret key for refresh tokens
- `PWA_URL`: Frontend URL (for CORS)

---

## 🚀 Running

### Start the server

```bash
npm start
```

The server will be available at: `http://localhost:3001`

### Verify it's working

Open your browser at:
```
http://localhost:3001/
```

You should see: `¡Hi API PostSpace!`

### Access Swagger Documentation

```
http://localhost:3001/swagger
```

Here you'll find the complete interactive documentation of the endpoints.

---

## 👨‍💻 Author

Carlos Ivan Macias Padilla - Fullstack Developer

Last updated: March 2026