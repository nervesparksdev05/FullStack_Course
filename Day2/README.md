# 🚀 Express JWT REST API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![JWT](https://img.shields.io/badge/JWT-9.0-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Production-ready Express.js REST API with JWT authentication, modular architecture, and comprehensive error handling**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API Docs](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Authentication Flow](#-authentication-flow)
- [Architecture](#-architecture)
- [Security](#-security)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Features
✅ **JWT Authentication** - Secure token-based auth with refresh tokens  
✅ **RESTful API** - Clean, semantic endpoints following REST principles  
✅ **Modular Architecture** - Separation of concerns (routes, controllers, services)  
✅ **Centralized Error Handling** - Consistent error responses  
✅ **Async/Await** - Modern async patterns with error handling  
✅ **Environment Configuration** - Flexible config with dotenv  
✅ **CORS Support** - Configurable cross-origin resource sharing  
✅ **Rate Limiting** - Protection against brute force attacks  

### Technical Features
⚡ **Express.js** - Fast, unopinionated web framework  
🔒 **Helmet** - Security headers  
📝 **Morgan** - HTTP request logging  
🛡️ **Input Validation** - Request validation  
🎯 **Repository Pattern** - Clean data access layer  
🔑 **Bcrypt** - Secure password hashing  
🚦 **HTTP Status Codes** - Proper status code usage  

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Express.js 4.18 | Web framework |
| Authentication | JWT (jsonwebtoken) | Token-based auth |
| Security | Helmet + bcryptjs | Security headers & password hashing |
| CORS | cors | Cross-origin requests |
| Logging | Morgan | HTTP request logging |
| Rate Limiting | express-rate-limit | DDoS protection |
| Environment | dotenv | Configuration management |

---

## 📁 Project Structure

```
express-jwt-api/
├── src/
│   ├── server.js                 # Server entry point
│   ├── app.js                    # Express app configuration
│   │
│   ├── config/
│   │   └── env.js                # Environment configuration
│   │
│   ├── routes/
│   │   ├── index.js              # Main routes aggregator
│   │   ├── auth.routes.js        # Authentication routes
│   │   └── items.routes.js       # Items CRUD routes
│   │
│   ├── controllers/
│   │   ├── auth.controller.js    # Auth HTTP handlers
│   │   └── items.controller.js   # Items HTTP handlers
│   │
│   ├── services/
│   │   ├── auth.service.js       # Auth business logic
│   │   └── items.service.js      # Items business logic
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── error.middleware.js   # Error handling
│   │
│   └── utils/
│       ├── ApiError.js           # Custom error class
│       ├── ApiResponse.js        # Response formatter
│       └── asyncHandler.js       # Async wrapper
│
├── docs/                          # Documentation
├── tests/                         # Test files
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### Directory Responsibilities

- **`config/`** - Application configuration and environment variables
- **`routes/`** - Route definitions and endpoint mapping
- **`controllers/`** - HTTP request handlers
- **`services/`** - Business logic and data operations
- **`middleware/`** - Custom middleware (auth, error handling)
- **`utils/`** - Utility functions and helpers
- **`docs/`** - API documentation and architecture diagrams

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm 9+**

### Step 1: Install Dependencies

```bash
cd express-jwt-api
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
CORS_ORIGIN=http://localhost:3000
```

**Generate secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Run Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server starts at: **http://localhost:3000**

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints Overview

#### 🔓 Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/auth/login` | Login with credentials |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/refresh` | Refresh access token |

#### 🔒 Protected Endpoints (Require JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/items` | Get all items |
| GET | `/api/items/my-items` | Get user's items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item (owner only) |
| DELETE | `/api/items/:id` | Delete item (owner only) |

---

## 🔐 Authentication Flow

### Complete Authentication Journey

```
┌──────────┐                                  ┌──────────┐
│  Client  │                                  │  Server  │
└────┬─────┘                                  └────┬─────┘
     │                                             │
     │  1. POST /api/auth/register                │
     │     {email, password, name}                │
     ├────────────────────────────────────────────▶
     │                                             │
     │                           2. Hash password  │
     │                           3. Create user    │
     │                           4. Generate JWT   │
     │                                             │
     │  5. Return {user, token, refreshToken}      │
     ◀────────────────────────────────────────────┤
     │                                             │
     │  6. POST /api/auth/login                   │
     │     {email, password}                       │
     ├────────────────────────────────────────────▶
     │                                             │
     │                           7. Verify password│
     │                           8. Generate JWT   │
     │                                             │
     │  9. Return {user, token, refreshToken}      │
     ◀────────────────────────────────────────────┤
     │                                             │
     │  10. GET /api/items                        │
     │      Authorization: Bearer <token>          │
     ├────────────────────────────────────────────▶
     │                                             │
     │                          11. Verify JWT     │
     │                          12. Attach user    │
     │                          13. Execute route  │
     │                                             │
     │  14. Return items                           │
     ◀────────────────────────────────────────────┤
```

### 1️⃣ Register New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "secure123",
    "name": "New User"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "3",
      "email": "newuser@example.com",
      "name": "New User",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2️⃣ Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@demo.com",
    "password": "demo123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1",
      "email": "demo@demo.com",
      "role": "user",
      "name": "Demo User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3️⃣ Access Protected Routes

```bash
curl -X GET http://localhost:3000/api/items \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4️⃣ Refresh Token

```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

## 🏗️ Architecture

### High-Level Architecture

```
┌──────────────┐
│   Clients    │  (Web, Mobile, Postman)
└──────┬───────┘
       │ HTTP/HTTPS
       ▼
┌─────────────────────────┐
│  Express.js Server      │
│  ┌───────────────────┐  │
│  │   Middleware      │  │
│  │  - Helmet         │  │
│  │  - CORS           │  │
│  │  - Rate Limit     │  │
│  │  - Morgan         │  │
│  └────────┬──────────┘  │
│           │              │
│  ┌────────▼──────────┐  │
│  │   Routes          │  │
│  │  /auth, /items    │  │
│  └────────┬──────────┘  │
│           │              │
│  ┌────────▼──────────┐  │
│  │  Auth Middleware  │  │
│  │  (JWT Verify)     │  │
│  └────────┬──────────┘  │
│           │              │
│  ┌────────▼──────────┐  │
│  │   Controllers     │  │
│  │  (HTTP Handlers)  │  │
│  └────────┬──────────┘  │
│           │              │
│  ┌────────▼──────────┐  │
│  │   Services        │  │
│  │  (Business Logic) │  │
│  └────────┬──────────┘  │
│           │              │
│  ┌────────▼──────────┐  │
│  │  Error Handler    │  │
│  │  (Centralized)    │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

### Request Flow

```
1. Request arrives at Express server
   ↓
2. Security middleware (Helmet, CORS, Rate Limit)
   ↓
3. Body parsing middleware
   ↓
4. Logging middleware (Morgan)
   ↓
5. Route matching
   ↓
6. Authentication middleware (if protected route)
   ↓
7. Controller (HTTP request handler)
   ↓
8. Service (business logic)
   ↓
9. Response formatting
   ↓
10. Error handling (if error occurs)
    ↓
11. Send response to client
```

---

## 🔒 Security

### Implemented Security Measures

#### 1. Password Security
✅ Bcrypt hashing with configurable rounds  
✅ Minimum 6 characters enforced  
✅ Never stored in plain text  
✅ Never returned in API responses

#### 2. JWT Security
✅ HS256 algorithm  
✅ Configurable expiration (default 1h)  
✅ Refresh tokens (7 days)  
✅ Bearer token scheme

#### 3. HTTP Security Headers (Helmet)
✅ Content Security Policy  
✅ X-Frame-Options  
✅ X-Content-Type-Options  
✅ Strict-Transport-Security

#### 4. Rate Limiting
✅ 100 requests per 15 minutes per IP  
✅ Configurable limits  
✅ Standard headers

#### 5. CORS
✅ Configurable allowed origins  
✅ Credentials support  
✅ Preflight request handling

#### 6. Input Validation
✅ Request body validation  
✅ Email format validation  
✅ Password strength checks

---

## 🛠️ Error Handling

### Centralized Error System

All errors are handled through a centralized middleware that provides consistent error responses.

### Error Response Format

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Development Mode (includes stack trace)

```json
{
  "success": false,
  "message": "Error message",
  "stack": "Error stack trace...",
  "url": "/api/items/123",
  "method": "GET"
}
```

### Common Error Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid or missing token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already registered |
| 500 | Internal Server Error | Unexpected error |

---

## 🧪 Testing

### Manual Testing

```bash
# Health check
curl http://localhost:3000/health

# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get items (requires token)
curl http://localhost:3000/api/items \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import collection (create from endpoints above)
2. Set environment variables:
   - `baseUrl`: `http://localhost:3000`
   - `token`: Set after login
3. Test all endpoints

---

## 🚀 Deployment

### Production Configuration

```env
NODE_ENV=production
PORT=80
JWT_SECRET=<64-char-random-string>
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX_REQUESTS=100
```

