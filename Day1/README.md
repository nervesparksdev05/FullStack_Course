Perfect — based on your **actual project structure**, here is the **updated, accurate `README.md`**.
You can **copy-paste this directly** into your repo root.

---

```md
# 🚀 Fullstack Coursework – Day 1  
## React Performance, Architecture & Optimization Lab

This project demonstrates **modern React development practices** using **Vite**, focusing on **performance, scalability, and clean architecture**.

All tasks were implemented as part of **Day 1 coursework**, covering:
- Context API
- Lazy loading & code splitting
- Infinite scroll with pagination
- Performance auditing using Chrome DevTools & Lighthouse

---

## 🧰 Tech Stack

- **React 18**
- **Vite**
- **React Router v6**
- **Tailwind CSS v4**
- **ESLint**
- **Chrome DevTools**
- **Lighthouse**

---

## 📁 Project Structure

```

FULLSTACK-COURSEWORK/
└── Day1/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BigTable.jsx
│   │   ├── Header.jsx
│   │   ├── HeavyChart.jsx
│   │   ├── InfiniteUsersTable.jsx
│   │   ├── Nav.jsx
│   │   └── Spinner.jsx
│   ├── context/
│   │   ├── theme.utils.js
│   │   ├── ThemeContext.jsx
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── InfiniteTable.jsx
│   │   ├── NotFound.jsx
│   │   ├── Settings.jsx
│   │   └── Users.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
└── index.html

````

---

## 1️⃣ Context API – Global State Management

### Implemented Features
- Centralized **Theme Context** (Light / Dark)
- Custom hook `useTheme()` for safe consumption
- Theme persistence using `localStorage`
- Tailwind CSS v4 dark mode using `.dark` class

### Architecture Decisions
- Context logic split into **3 files** for Fast Refresh compatibility:
  - `ThemeContext.jsx` → Provider
  - `useTheme.js` → Custom hook
  - `theme.utils.js` → Helper functions

### Benefits
- Eliminates prop drilling
- Prevents unnecessary re-renders
- Clean, scalable global state pattern

---

## 2️⃣ Lazy Loading & Code Splitting

### Route-level Lazy Loading
All major pages are lazy-loaded using `React.lazy()`:

```js
const Users = React.lazy(() => import("../pages/Users.jsx"));
````

Wrapped inside `<Suspense>` in `App.jsx` to show loading indicators.

---

### Component-level Lazy Loading

Heavy components are loaded **only when required**:

```js
const BigTable = React.lazy(() => import("../components/BigTable.jsx"));
```

Used for:

* Large tables
* Charts
* Expensive UI components

---

## 3️⃣ Paginated Data Table with Infinite Scroll

### Component

```
src/components/InfiniteUsersTable.jsx
```

### Features

* API-driven pagination
* Infinite scrolling using **IntersectionObserver**
* Duplicate data prevention
* Graceful loading & error handling
* Fully scroll-based pagination (no buttons)

### API Used

```
https://dummyjson.com/users
```

### How It Works

* Fetches users in chunks (`limit` + `skip`)
* Automatically loads next page when user reaches bottom
* Stops fetching when all data is loaded

---

## 4️⃣ Performance Optimization Techniques

* ✅ Code splitting (routes + components)
* ✅ Lazy loading heavy UI
* ✅ Memoization (`useMemo`)
* ✅ Avoided unnecessary `useEffect` state updates
* ✅ IntersectionObserver instead of scroll listeners
* ✅ Reduced initial JavaScript bundle size

---

## 5️⃣ Performance Audit – Chrome DevTools & Lighthouse

### Lighthouse Audit

Used Chrome Lighthouse to measure:

* **Performance**
* Accessibility
* Best Practices
* SEO

Key metrics analyzed:

* First Contentful Paint (FCP)
* Largest Contentful Paint (LCP)
* Total Blocking Time (TBT)
* Cumulative Layout Shift (CLS)

🎯 **Target Achieved:** Lighthouse Performance score **> 90**

---

### Chrome DevTools – Performance Tab

Used to:

* Identify long JavaScript tasks
* Detect unnecessary re-renders
* Verify smooth scrolling
* Confirm no main-thread blocking

---

## 🔍 How to Verify Lazy Loading

### Route-level Verification

1. Open Chrome DevTools → Network
2. Filter by **JS**
3. Navigate between routes
4. Observe new JS chunks loading per route

---

### Component-level Verification

1. Open `/infinite-table`
2. Click **Show Table**
3. Observe a new JS chunk load for `InfiniteUsersTable.jsx`

---

## ▶️ Running the Project Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## ✅ Day 1 Completion Checklist

* ✔ Context API implemented with working example
* ✔ Lazy loading configured for routes & components
* ✔ Infinite scroll pagination with API integration
* ✔ ESLint warnings resolved (Fast Refresh compliant)
* ✔ Performance audit completed using Lighthouse
* ✔ Clean, modular folder structure

---

## 🧠 Key Learnings

* Lazy loading significantly improves perceived performance
* Infinite scrolling requires both pagination and observer logic
* Performance audits are essential for production apps
* Context API must be structured carefully to avoid re-render issues

---

## 🔮 Possible Enhancements

* Virtualized tables (`react-window`)
* Server-side filtering & sorting
* Skeleton loaders
* Error retry & backoff strategy
* Lighthouse CI integration

---

👨‍💻 **Fullstack Coursework – Day 1**
Performance & Architecture Lab

```


