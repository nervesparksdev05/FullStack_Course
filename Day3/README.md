# 🚀 FastAPI MongoDB CRUD API (Async, OAuth2, Python 3.11)

A production-ready **FastAPI backend** built with **Python 3.11.9**, **MongoDB Atlas**, and **async Motor driver**, featuring:

* ✅ Auto-generated API documentation (Swagger & ReDoc)
* ✅ Fully async CRUD operations
* ✅ Pydantic v2 validation
* ✅ OAuth2 + JWT authentication
* ✅ Secure password hashing
* ✅ CORS configuration
* ✅ Clean, scalable project structure

---

## 🧱 Tech Stack

| Layer            | Technology       |
| ---------------- | ---------------- |
| Framework        | FastAPI          |
| Language         | Python 3.11.9    |
| Database         | MongoDB Atlas    |
| DB Driver        | Motor (Async)    |
| Auth             | OAuth2 + JWT     |
| Validation       | Pydantic v2      |
| Server           | Uvicorn          |
| Password Hashing | Passlib (bcrypt) |

---

## 📁 Project Structure

```
Day3/
├─ app/
│  ├─ main.py                # FastAPI app entrypoint
│  ├─ core/
│  │  ├─ config.py           # Environment & settings
│  │  ├─ security.py         # JWT & password hashing
│  │  └─ cors.py             # CORS setup
│  ├─ db/
│  │  └─ mongo.py            # MongoDB connection
│  ├─ models/
│  │  ├─ user.py             # User schemas
│  │  └─ item.py             # Item schemas
│  ├─ repositories/
│  │  ├─ user_repo.py        # User DB logic
│  │  └─ item_repo.py        # Item CRUD logic
│  ├─ api/
│  │  ├─ deps.py             # Auth dependencies
│  │  └─ routes/
│  │     ├─ auth.py          # Auth routes
│  │     └─ items.py         # Item CRUD routes
│  └─ utils/
│     └─ bson.py             # ObjectId helpers
├─ venv/
├─ .env.example
├─ .gitignore
├─ requirements.txt
├─ pyproject.toml
└─ README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Create & Activate Virtual Environment

```powershell
py -3.11 -m venv venv
.\venv\Scripts\Activate.ps1
```

---

### 2️⃣ Install Dependencies

```powershell
pip install -r requirements.txt
```

---

### 3️⃣ Configure Environment Variables

Create `.env` from example:

```powershell
copy .env.example .env
```

Update `.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
JWT_SECRET=super_secret_key
CORS_ORIGINS=http://localhost:3000
```

---

### 4️⃣ Run the Server

```powershell
uvicorn app.main:app --reload
```

Server will start at:

```
http://127.0.0.1:8000
```

---

## 📚 API Documentation

FastAPI provides auto-generated docs:

| Type       | URL                                                        |
| ---------- | ---------------------------------------------------------- |
| Swagger UI | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)   |
| ReDoc      | [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc) |

---

## 🔐 Authentication Flow (OAuth2 + JWT)

### 1️⃣ Register User

`POST /auth/register`

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

---

### 2️⃣ Login (Get Token)

`POST /auth/token`
**Form-data (OAuth2 spec)**

| Field    | Value                                       |
| -------- | ------------------------------------------- |
| username | [user@example.com](mailto:user@example.com) |
| password | secret123                                   |

Response:

```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer"
}
```

---

### 3️⃣ Authorize in Swagger

* Click **Authorize**
* Enter:

```
Bearer <access_token>
```

---

## 📦 CRUD API (Protected)

### ➕ Create Item

`POST /items`

```json
{
  "title": "My Item",
  "description": "Optional description"
}
```

---

### 📄 List Items

`GET /items`

---

### 🔍 Get Item

`GET /items/{item_id}`

---

### ✏️ Update Item

`PUT /items/{item_id}`

```json
{
  "title": "Updated title"
}
```

---

### ❌ Delete Item

`DELETE /items/{item_id}`

---

## 🧪 Health Check

`GET /health`

```json
{
  "status": "ok"
}
```

---

## 🔒 Security Features

* Password hashing using **bcrypt**
* JWT expiration handling
* OAuth2 password flow
* Per-user data isolation
* CORS configurable via env

---

## 🧠 Async & Performance

* Fully **async** endpoints
* Non-blocking MongoDB operations
* Suitable for high-concurrency workloads
* Clean repository pattern

---

## 🧹 Git Ignore Highlights

* Virtual environments
* `.env` secrets
* Python caches
* IDE files
* OS junk

---

## 📌 Python Version

Pinned via `pyproject.toml`:

```toml
requires-python = "==3.11.9"
```

