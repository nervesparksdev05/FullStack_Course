# Express JWT REST API

A clean, structured **Express.js REST API** implementing **JWT authentication**, **environment-based configuration**, **centralized error handling**, and **CRUD endpoints**.  
Designed as a **production-ready backend skeleton**.

---

## Features

- Express server with **modular folder architecture**
- **JWT Authentication**
  - Token generation
  - Token verification middleware
- **Environment variables** using `.env`
- **Centralized error handling middleware**
- **RESTful CRUD API**
- Async error-safe controllers

---

## Tech Stack

- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **dotenv**
- **Morgan**
- **CORS**

---

## Project Structure

```

express-jwt-api/
├─ package.json
├─ .env
├─ .env.example
├─ README.md
└─ src/
├─ server.js
├─ app.js
├─ config/
│  └─ env.js
├─ routes/
│  ├─ index.js
│  ├─ auth.routes.js
│  └─ items.routes.js
├─ controllers/
│  ├─ auth.controller.js
│  └─ items.controller.js
├─ services/
│  ├─ auth.service.js
│  └─ items.service.js
├─ middleware/
│  ├─ auth.middleware.js
│  └─ error.middleware.js
└─ utils/
├─ asyncHandler.js
└─ ApiError.js

````

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
````

### 2. Environment configuration

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

JWT_SECRET=super_long_random_secret_value
JWT_EXPIRES_IN=1h
```

---

### 3. Run the server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## API Endpoints

### Health Check

```
GET /health
```

---

## Authentication

### Login (Generate JWT)

```
POST /api/auth/login
```

**Request Body**

```json
{
  "email": "demo@demo.com",
  "password": "demo123"
}
```

**Response**

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "role": "user"
  }
}
```

---

### Get Current User (JWT Protected)

```
GET /api/auth/me
```

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Items CRUD (JWT Required)

All endpoints below require:

```
Authorization: Bearer <JWT_TOKEN>
```

### Get All Items

```
GET /api/items
```

### Get Item by ID

```
GET /api/items/:id
```

### Create Item

```
POST /api/items
```

**Body**

```json
{
  "name": "My Item"
}
```

---

### Update Item

```
PUT /api/items/:id
```

**Body**

```json
{
  "name": "Updated Item Name"
}
```

---

### Delete Item

```
DELETE /api/items/:id
```

---

## Error Handling

* Centralized error middleware
* Consistent error response format
* HTTP status-based error handling
* Stack traces shown only in development mode

**Example**

```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## Authentication Flow

1. User logs in with credentials
2. Server returns JWT token
3. Client stores token
4. Token sent in `Authorization` header
5. Middleware verifies token
6. Protected routes grant access

---

## Postman Setup

Create environment variables:

```
baseUrl = http://localhost:3000
token = <set after login>
itemId = <set after creating item>
```

---

