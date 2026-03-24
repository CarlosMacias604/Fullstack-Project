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

### Start Frontend Development Server

In a new terminal:

```bash
cd Frontend
npm run dev
```

✅ Frontend will open at: `http://localhost:5173` (usually automatic)

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token

### Posts
- `GET /api/posts` - Get all posts (paginated, requires auth)
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)
- `GET /api/search?query=...&category=...` - Search posts

### Comments
- `GET /api/posts/:postId/comments` - Get post comments
- `POST /api/posts/:postId/comments` - Create comment (requires auth)
- `PUT /api/comments/:id` - Update comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

### Likes
- `POST /api/posts/:postId/like` - Add like (requires auth)
- `DELETE /api/posts/:postId/like` - Remove like (requires auth)
- `GET /api/posts/:postId/likes` - Get like status (requires auth)

---

## 📁 Project Structure

### Backend (`/Backend`)
```
src/
├── Models/              # Database schemas
│   ├── User.js
│   ├── Post.js
│   ├── Category.js
│   ├── Comment.js
│   └── Like.js
├── Controllers/         # Business logic
├── Routes/             # API endpoints
├── Middlewares/        # Auth, validation, error handling
├── Config/             # Database configuration
└── app.js
```

### Frontend (`/Frontend`)
```
src/
├── components/
│   ├── Auth/          # Login, Register forms
│   ├── Posts/         # PostCard component
│   └── Common/        # NavBar, Loading, ErrorAlert
├── pages/             # Full page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── CreatePostPage.tsx
│   ├── PostDetailPage.tsx
│   └── SearchResultsPage.tsx
├── layouts/           # AuthLayout, DashboardLayout
├── context/           # AuthContext for global auth state
├── services/          # API axios services
├── hooks/             # Custom hooks (useAuth)
├── types/             # TypeScript interfaces
├── theme/             # Material UI theme
└── App.tsx            # Main router
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns `token` (JWT) and `refreshToken`
3. Both are stored in `localStorage`
4. All API requests include: `Authorization: Bearer <token>`
5. If token expires, refresh token automatically gets a new one
6. If refresh fails, user is redirected to login

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

## 🧪 Quick Test

### 1. Register & Login
- Go to `http://localhost:5173/register`
- Fill in the form and create an account
- Login with your credentials

### 2. Create a Post
- Click "New Post" button
- Fill in title, content, select a category
- Click "Publish Post"

### 3. Interact with Posts
- Click on a post to view details
- Add comments and likes
- Try searching for posts in the navbar

---

## 📝 Environment Variables

### Backend `.env`
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/postspace
JWT_SECRET=<secure_random_key>
JWT_REFRESH_SECRET=<secure_random_key>
PWA_URL=http://localhost:5173
SWAGGER_SERVER_URL=http://localhost:3001
```

### Frontend
No .env needed - configured in `src/services/api.ts`

---

## 🚀 Build & Deploy

### Frontend Build
```bash
cd Frontend
npm run build
```
Output in `dist/` folder - ready for deployment to Vercel, Netlify, etc.

### Backend Deployment
Host on: Heroku, Railway, Render, Fly.io, etc.

---

## 👨‍💻 Author

Carlos Ivan Macias Padilla - Fullstack Developer

Last updated: March 2026