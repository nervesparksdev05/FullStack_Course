<div align="center">

# 🔐 Express JWT REST API

### A Production-Ready Backend Skeleton

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A clean, structured **Express.js REST API** implementing **JWT authentication**, **environment-based configuration**, **centralized error handling**, and **RESTful CRUD endpoints**.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup](#-setup-instructions) • [API Docs](#-api-endpoints) • [Architecture](#-project-architecture)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Setup Instructions](#-setup-instructions)
- [API Endpoints](#-api-endpoints)
  - [Health Check](#health-check)
  - [Authentication](#authentication)
  - [Items CRUD](#items-crud-jwt-required)
- [Error Handling](#-error-handling)
- [Authentication Flow](#-authentication-flow)
- [Postman Setup](#-postman-setup)
- [Production Notes](#-production-notes)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

<table>
<tr>
<td>

### 🏗️ **Architecture**
- ✅ Modular folder structure
- ✅ Separation of concerns
- ✅ Scalable code organization
- ✅ Environment-based config

</td>
<td>

### 🔒 **Security**
- ✅ JWT token generation
- ✅ Token verification middleware
- ✅ Protected routes
- ✅ Environment secrets

</td>
</tr>
<tr>
<td>

### 🛠️ **Developer Experience**
- ✅ Centralized error handling
- ✅ Async error-safe controllers
- ✅ Clean code patterns
- ✅ Easy to extend

</td>
<td>

### 🚀 **API Features**
- ✅ RESTful CRUD operations
- ✅ Consistent response format
- ✅ CORS enabled
- ✅ Request logging

</td>
</tr>
</table>

---

## 🧰 Tech Stack

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | Runtime Environment | v18+ |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | v4+ |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) | Authentication | Latest |
| ![dotenv](https://img.shields.io/badge/.env-ECD53F?style=flat&logo=dotenv&logoColor=black) | Environment Config | Latest |
| ![Morgan](https://img.shields.io/badge/Morgan-Logger-orange?style=flat) | HTTP Logger | Latest |
| ![CORS](https://img.shields.io/badge/CORS-Enabled-blue?style=flat) | Cross-Origin Support | Latest |

</div>

---

## 🏛️ Project Architecture
```
express-jwt-api/
│
├── 📦 package.json              # Dependencies & scripts
├── 🔐 .env                      # Environment variables (gitignored)
├── 📝 .env.example              # Environment template
├── 📖 README.md                 # Project documentation
│
└── 📁 src/
    ├── 🚀 server.js             # Application entry point
    ├── 🎯 app.js                # Express app configuration
    │
    ├── ⚙️ config/
    │   └── env.js               # Environment variable exports
    │
    ├── 🛣️ routes/
    │   ├── index.js             # Route aggregator
    │   ├── auth.routes.js       # Authentication routes
    │   └── items.routes.js      # Items CRUD routes
    │
    ├── 🎮 controllers/
    │   ├── auth.controller.js   # Auth request handlers
    │   └── items.controller.js  # Items request handlers
    │
    ├── 💼 services/
    │   ├── auth.service.js      # Auth business logic
    │   └── items.service.js     # Items business logic
    │
    ├── 🛡️ middleware/
    │   ├── auth.middleware.js   # JWT verification
    │   └── error.middleware.js  # Centralized error handler
    │
    └── 🔧 utils/
        ├── asyncHandler.js      # Async error wrapper
        └── ApiError.js          # Custom error class
```

### 📐 Architecture Layers
```mermaid
graph TD
    A[Client Request] --> B[Routes Layer]
    B --> C[Middleware Layer]
    C --> D[Controllers Layer]
    D --> E[Services Layer]
    E --> F[Response]
    
    style A fill:#e1f5ff
    style B fill:#fff3cd
    style C fill:#f8d7da
    style D fill:#d4edda
    style E fill:#d1ecf1
    style F fill:#e1f5ff
```

---

## 🚀 Setup Instructions

### **Prerequisites**
```bash
node >= 18.0.0
npm >= 9.0.0
```

### **1️⃣ Clone the Repository**
```bash
git clone <your-repo-url>
cd express-jwt-api
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Environment Configuration**

Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secure_secret_key_minimum_32_characters_long
JWT_EXPIRES_IN=1h
```

> 💡 **Tip:** Use a strong random string for `JWT_SECRET`. Generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### **4️⃣ Run the Server**

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

### **5️⃣ Verify Installation**

Server will start at:
```
🚀 Server running at: http://localhost:3000
```

Test the health endpoint:
```bash
curl http://localhost:3000/health
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

---

### **Health Check**

<details>
<summary><b>GET</b> <code>/health</code> - Check server status</summary>

#### Request
```http
GET /health HTTP/1.1
Host: localhost:3000
```

#### Response
```json
{
  "status": "ok",
  "timestamp": "2024-01-13T10:30:00.000Z"
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | Server is running |

</details>

---

### **Authentication**

#### 🔓 Login (Generate JWT)

<details>
<summary><b>POST</b> <code>/api/auth/login</code> - User authentication</summary>

#### Request
```http
POST /api/auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "demo@demo.com",
  "password": "demo123"
}
```

#### Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "role": "user"
  }
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | Login successful |
| `401` | Invalid credentials |
| `400` | Missing email/password |

</details>

---

#### 🔒 Get Current User (Protected)

<details>
<summary><b>GET</b> <code>/api/auth/me</code> - Get authenticated user details</summary>

#### Request
```http
GET /api/auth/me HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "demo@demo.com",
    "role": "user"
  }
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | User details retrieved |
| `401` | Invalid/missing token |
| `403` | Token expired |

</details>

---

### **Items CRUD** (JWT Required)

> 🔐 **All endpoints require:** `Authorization: Bearer <JWT_TOKEN>`

---

#### 📋 Get All Items

<details>
<summary><b>GET</b> <code>/api/items</code> - Retrieve all items</summary>

#### Request
```http
GET /api/items HTTP/1.1
Host: localhost:3000
Authorization: Bearer <JWT_TOKEN>
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Item 1",
      "createdAt": "2024-01-13T10:00:00.000Z"
    },
    {
      "id": "2",
      "name": "Item 2",
      "createdAt": "2024-01-13T11:00:00.000Z"
    }
  ],
  "count": 2
}
```

</details>

---

#### 🔍 Get Item by ID

<details>
<summary><b>GET</b> <code>/api/items/:id</code> - Retrieve single item</summary>

#### Request
```http
GET /api/items/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer <JWT_TOKEN>
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Item 1",
    "createdAt": "2024-01-13T10:00:00.000Z"
  }
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | Item found |
| `404` | Item not found |

</details>

---

#### ➕ Create Item

<details>
<summary><b>POST</b> <code>/api/items</code> - Create new item</summary>

#### Request
```http
POST /api/items HTTP/1.1
Host: localhost:3000
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "My New Item"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "3",
    "name": "My New Item",
    "createdAt": "2024-01-13T12:00:00.000Z"
  }
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `201` | Item created |
| `400` | Invalid data |

</details>

---

#### ✏️ Update Item

<details>
<summary><b>PUT</b> <code>/api/items/:id</code> - Update existing item</summary>

#### Request
```http
PUT /api/items/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Updated Item Name"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Updated Item Name",
    "updatedAt": "2024-01-13T13:00:00.000Z"
  }
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | Item updated |
| `404` | Item not found |
| `400` | Invalid data |

</details>

---

#### 🗑️ Delete Item

<details>
<summary><b>DELETE</b> <code>/api/items/:id</code> - Remove item</summary>

#### Request
```http
DELETE /api/items/1 HTTP/1.1
Host: localhost:3000
Authorization: Bearer <JWT_TOKEN>
```

#### Response
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

#### Status Codes
| Code | Description |
|------|-------------|
| `200` | Item deleted |
| `404` | Item not found |

</details>

---

## 🚨 Error Handling

### **Features**
- ✅ Centralized error middleware
- ✅ Consistent error response format
- ✅ HTTP status-based error handling
- ✅ Stack traces in development mode only

### **Error Response Format**
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "statusCode": 400,
    "stack": "Error stack (dev only)"
  }
}
```

### **Common Error Codes**

| Status Code | Meaning | Example |
|-------------|---------|---------|
| `400` | Bad Request | Invalid input data |
| `401` | Unauthorized | Missing/invalid token |
| `403` | Forbidden | Token expired |
| `404` | Not Found | Resource doesn't exist |
| `500` | Server Error | Unexpected server issue |

---

## 🔐 Authentication Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server
    participant M as Middleware
    participant DB as Database
    
    C->>S: POST /api/auth/login (email, password)
    S->>DB: Verify credentials
    DB-->>S: User data
    S->>S: Generate JWT
    S-->>C: Return token + user data
    
    Note over C: Store token
    
    C->>S: GET /api/items (with JWT)
    S->>M: Verify token
    M->>M: Decode & validate
    M-->>S: User authenticated
    S->>DB: Fetch items
    DB-->>S: Items data
    S-->>C: Return protected data
```

### **Steps:**

1. **🔑 Login Request**
   - User sends credentials to `/api/auth/login`
   - Server validates credentials

2. **🎫 Token Generation**
   - Server generates JWT with user payload
   - Token includes expiration time

3. **💾 Token Storage**
   - Client stores token (localStorage, cookie, etc.)

4. **📤 Authenticated Requests**
   - Client includes token in `Authorization` header
   - Format: `Bearer <token>`

5. **✅ Token Verification**
   - Middleware extracts and validates token
   - Decodes user information from token

6. **🎯 Access Granted**
   - Protected routes grant access to authenticated users

---

## 📮 Postman Setup

### **Environment Variables**

Create a Postman environment with these variables:
```javascript
{
  "baseUrl": "http://localhost:3000",
  "token": "",        // Set after login
  "itemId": ""        // Set after creating item
}
```

### **Quick Setup Steps**

1. **Import Collection**
   - Create new collection: "Express JWT API"
   - Set collection auth to "Bearer Token"
   - Use `{{token}}` as the token value

2. **Configure Requests**

   **Login Request:**
```
   POST {{baseUrl}}/api/auth/login
```
   Add test script to save token:
```javascript
   pm.test("Save token", function() {
       const response = pm.response.json();
       pm.environment.set("token", response.token);
   });
```

   **Create Item Request:**
```
   POST {{baseUrl}}/api/items
```
   Add test script to save itemId:
```javascript
   pm.test("Save item ID", function() {
       const response = pm.response.json();
       pm.environment.set("itemId", response.data.id);
   });
```

3. **Use Variables**
```
   GET {{baseUrl}}/api/items/{{itemId}}
   PUT {{baseUrl}}/api/items/{{itemId}}
   DELETE {{baseUrl}}/api/items/{{itemId}}
```

---

## 🚀 Production Notes

### **Security Enhancements**

- [ ] **Database Integration**
  - Replace in-memory stores with MongoDB/PostgreSQL
  - Implement connection pooling
  - Add database migrations

- [ ] **Password Security**
  - Hash passwords using `bcrypt` (salt rounds: 10-12)
  - Implement password strength validation
  - Add password reset functionality

- [ ] **Token Management**
  - Implement refresh tokens
  - Add token blacklisting for logout
  - Set shorter expiration times

- [ ] **Authorization**
  - Add role-based access control (RBAC)
  - Implement permission middleware
  - Add resource ownership validation

### **Validation & Sanitization**

- [ ] Add input validation using Zod/Joi
- [ ] Sanitize user inputs
- [ ] Implement rate limiting
- [ ] Add request size limits

### **Monitoring & Logging**

- [ ] Integrate Winston for structured logging
- [ ] Add request ID tracking
- [ ] Set up error tracking (Sentry)
- [ ] Implement health check endpoints

### **Performance**

- [ ] Add Redis for caching
- [ ] Implement database query optimization
- [ ] Enable compression middleware
- [ ] Add response caching headers

### **Deployment**

- [ ] Set up CI/CD pipeline
- [ ] Configure Docker containerization
- [ ] Add Kubernetes manifests
- [ ] Set up monitoring dashboards

<div align="center">

</div>