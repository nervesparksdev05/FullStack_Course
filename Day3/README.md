# 🚀 FastAPI MongoDB CRUD API

<div align="center">

![Python](https://img.shields.io/badge/Python-3.11.9-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Motor](https://img.shields.io/badge/Motor-3.3.2-orange)

**A production-ready FastAPI backend with MongoDB Atlas, OAuth2 authentication, and fully async CRUD operations**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🧱 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔐 Authentication Flow](#-authentication-flow)
- [🗄️ MongoDB Setup](#️-mongodb-atlas-setup)
- [📚 API Documentation](#-api-documentation)
- [🏗️ Architecture](#️-architecture)
- [🔒 Security](#-security)
- [🚀 Deployment](#-deployment)

---

## ✨ Features

### Core Features
✅ **Auto-generated API documentation** (Swagger UI & ReDoc)  
✅ **Fully async CRUD operations** using Motor  
✅ **Pydantic v2 validation** for all requests/responses  
✅ **OAuth2 + JWT authentication** with secure password hashing  
✅ **CORS configuration** for cross-origin requests  
✅ **MongoDB Atlas integration** with cloud database  
✅ **Repository pattern** for clean data access layer  
✅ **Per-user data isolation** with ownership validation

### Technical Features
⚡ **Async/await throughout** - Non-blocking I/O operations  
🔒 **Bcrypt password hashing** - Industry-standard security  
🎯 **Dependency injection** - Clean and testable code  
📦 **Python 3.11.9** - Latest Python features  
🏗️ **Scalable architecture** - Repository pattern & clean separation  
🔍 **Type hints everywhere** - Better IDE support and code quality

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | FastAPI 0.109.0 | Modern async web framework |
| Language | Python 3.11.9 | Latest stable Python |
| Database | MongoDB Atlas | Cloud NoSQL database |
| DB Driver | Motor 3.3.2 | Async MongoDB driver |
| Validation | Pydantic v2 | Data validation & parsing |
| Authentication | OAuth2 + JWT | Secure token-based auth |
| Password Hash | Passlib (bcrypt) | Password security |
| Server | Uvicorn | Lightning-fast ASGI server |

---

## 📁 Project Structure

```
fastapi-mongodb/
├── app/
│   ├── main.py                    # Application entry point
│   ├── api/
│   │   ├── deps.py                # Authentication dependencies
│   │   └── routes/
│   │       ├── auth.py            # Auth endpoints (register, login)
│   │       └── items.py           # Item CRUD endpoints
│   ├── core/
│   │   ├── config.py              # Settings & env variables
│   │   ├── security.py            # JWT & password utilities
│   │   └── cors.py                # CORS configuration
│   ├── db/
│   │   └── mongo.py               # MongoDB connection
│   ├── models/
│   │   ├── user.py                # User schemas
│   │   └── item.py                # Item schemas
│   ├── repositories/
│   │   ├── user_repo.py           # User DB operations
│   │   └── item_repo.py           # Item DB operations
│   └── utils/
│       └── bson.py                # ObjectId utilities
├── docs/
│   ├── ARCHITECTURE.md            # Architecture diagrams
│   └── DATA_FLOW.md              # Request lifecycle
├── .env.example                   # Environment template
├── pyproject.toml                 # Python 3.11.9 requirement
├── requirements.txt               # Dependencies
└── README.md                      # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11.9** (exact version required)
- **MongoDB Atlas account** (free tier available)

### Step 1: Setup Environment

```powershell
# Create virtual environment (Python 3.11.9)
py -3.11 -m venv venv

# Activate
.\venv\Scripts\Activate.ps1  # PowerShell
# or
venv\Scripts\activate.bat     # CMD
# or (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configure Environment

```powershell
copy .env.example .env
```

Edit `.env` with your MongoDB Atlas connection:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
MONGODB_DB_NAME=fastapi_db
JWT_SECRET_KEY=<generate-strong-key>
```

**Generate secure JWT key:**
```powershell
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 3: Run Server

```powershell
uvicorn app.main:app --reload
```

Server starts at: **http://127.0.0.1:8000**

---

## 🔐 Authentication Flow

### 1️⃣ Register User

```bash
curl -X POST "http://127.0.0.1:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass123"}'
```

### 2️⃣ Login & Get Token

```bash
curl -X POST "http://127.0.0.1:8000/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=securepass123"
```

### 3️⃣ Authorize in Swagger

1. Copy `access_token` from response
2. Click **🔒 Authorize** at `/docs`
3. Enter: `Bearer <token>`
4. Click **Authorize** → **Close**

### 4️⃣ Use Protected Endpoints

```bash
curl -X POST "http://127.0.0.1:8000/items/" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Item","description":"Test"}'
```

---

## 🗄️ MongoDB Atlas Setup

### Quick Setup

1. **Create Account**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Choose free M0 tier
3. **Database Access**: Add user with password
4. **Network Access**: Add IP `0.0.0.0/0` (dev) or specific IPs (prod)
5. **Get Connection String**: Click Connect → Application → Copy URI
6. **Update .env**: Replace `<password>` in connection string

### Database Collections

#### users
```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "hashed_password": "$2b$12$...",
  "is_active": true,
  "created_at": ISODate("..."),
  "updated_at": ISODate("...")
}
```

#### items
```json
{
  "_id": ObjectId("..."),
  "title": "My Item",
  "description": "Description",
  "owner_id": "507f1f77...",
  "created_at": ISODate("..."),
  "updated_at": ISODate("...")
}
```

---

## 📚 API Documentation

### Interactive Docs

| Type | URL |
|------|-----|
| **Swagger UI** | http://127.0.0.1:8000/docs |
| **ReDoc** | http://127.0.0.1:8000/redoc |

### Endpoints

#### 🔓 Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/token` | Login & get token |

#### 🔒 Protected (requires authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/me` | Get current user |
| POST | `/items/` | Create item |
| GET | `/items/` | List all items |
| GET | `/items/my-items` | Get user's items |
| GET | `/items/{id}` | Get item by ID |
| PUT | `/items/{id}` | Update item (owner only) |
| DELETE | `/items/{id}` | Delete item (owner only) |

---

## 🏗️ Architecture

### High-Level Overview

```
┌──────────────┐
│   Clients    │  (Web, Mobile, API)
└──────┬───────┘
       │ HTTPS/JSON
       ▼
┌──────────────────────┐
│  FastAPI Application │
│  ┌────────────────┐  │
│  │  API Routes    │  │
│  │  (Auth, Items) │  │
│  └────────┬───────┘  │
│           │           │
│  ┌────────▼───────┐  │
│  │ Authentication │  │
│  │ (OAuth2/JWT)   │  │
│  └────────┬───────┘  │
│           │           │
│  ┌────────▼────────┐ │
│  │  Repositories   │ │
│  │  (Data Access)  │ │
│  └────────┬────────┘ │
└───────────┼──────────┘
            │ Motor (Async)
            ▼
┌───────────────────────┐
│   MongoDB Atlas       │
│  ┌──────┐  ┌──────┐  │
│  │Users │  │Items │  │
│  └──────┘  └──────┘  │
└───────────────────────┘
```

For detailed architecture with complete diagrams, see:
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Full system architecture
- **[docs/DATA_FLOW.md](docs/DATA_FLOW.md)** - Request lifecycle

---

## 🔒 Security

### Implemented Features

✅ **Password Security**
- Bcrypt hashing with salt
- Minimum 8 characters
- Never stored in plain text
- Never returned in responses

✅ **JWT Security**
- HS256 algorithm
- 30-minute expiration
- Secure secret key
- Bearer token scheme

✅ **Authorization**
- Per-user data isolation
- Owner-only modifications
- Active user verification
- Dependency injection

✅ **Input Validation**
- Pydantic schema validation
- Email format validation
- String length constraints
- Type checking

---

## 🚀 Deployment

### Production Configuration

```env
# .env (production)
MONGODB_URI=mongodb+srv://prod_user:strong_pass@prod.mongodb.net/
JWT_SECRET_KEY=<64-char-random-key>
CORS_ORIGINS=["https://yourdomain.com"]
DEBUG=false
```


