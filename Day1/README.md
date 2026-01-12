# 🚀 React Performance & Architecture Lab (Vite + React)

This repository demonstrates modern React best practices focused on **performance, scalability, and maintainability**, implemented using **Vite + React Router + Tailwind CSS v4**.

---

## 📌 Tech Stack
- **React 18**
- **Vite**
- **React Router v6**
- **Tailwind CSS v4**
- **ESLint**
- **Chrome DevTools & Lighthouse**

---

## 📁 Project Structure
```

src/
├── main.jsx
├── App.jsx
├── index.css
├── routes/
│   └── AppRoutes.jsx
├── context/
│   ├── ThemeContext.jsx
│   ├── useTheme.js
│   └── theme.utils.js
├── components/
│   ├── Header.jsx
│   ├── Spinner.jsx
│   ├── BigTable.jsx
│   └── InfiniteUsersTable.jsx
├── pages/
│   ├── Home.jsx
│   ├── Users.jsx
│   ├── InfiniteTable.jsx
│   ├── Settings.jsx
│   └── NotFound.jsx

````

---

## 1️⃣ Context API (Global State Management)

### What was implemented
- Centralized **Theme Context** (`light / dark`)
- Custom hook (`useTheme`) for safe access
- Persistent theme using `localStorage`
- Tailwind dark mode integration using `.dark` class on `<html>`

### Key Concepts
- Avoids prop drilling
- Uses `useMemo` to prevent unnecessary re-renders
- Follows React Fast Refresh best practices (split files)

---

## 2️⃣ Lazy Loading & Code Splitting

### Route-level lazy loading
All major pages are loaded lazily using `React.lazy()`:

```js
const Users = React.lazy(() => import("../pages/Users.jsx"));
````

Wrapped with a global `<Suspense>` fallback in `App.jsx`.

### Component-level lazy loading

Heavy UI components are loaded **only when needed**:

```js
const BigTable = React.lazy(() => import("../components/BigTable.jsx"));
```

This reduces initial bundle size and improves load performance.

---

## 3️⃣ Paginated Data Table with Infinite Scroll

### Features

* API-based pagination (`limit` + `skip`)
* Infinite scrolling using `IntersectionObserver`
* Prevents duplicate records
* Graceful loading and error handling
* Fully scroll-driven (no pagination buttons)

### API Used

```
https://dummyjson.com/users
```

### How it works

* Loads data page-by-page (20 rows per page)
* Automatically fetches next page when user reaches the bottom
* Stops fetching when all records are loaded

---

## 4️⃣ Performance Optimization Techniques Used

* ✅ Code splitting (routes + components)
* ✅ Lazy loading heavy UI
* ✅ Memoization (`useMemo`)
* ✅ Avoided unnecessary `useEffect` state updates
* ✅ IntersectionObserver instead of scroll listeners
* ✅ Reduced initial JS bundle size

---

## 5️⃣ Performance Audit (Chrome DevTools & Lighthouse)

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

🎯 **Target achieved:** Performance score **> 90**

---

### Chrome DevTools – Performance Tab

Used to:

* Identify long JS tasks
* Detect unnecessary re-renders
* Verify smooth scrolling
* Confirm no main-thread blocking

---

## 🔍 How to Verify Lazy Loading

### Route-level

1. Open Chrome DevTools → Network
2. Filter by **JS**
3. Navigate between routes
4. Observe new JS chunks loading per route

### Component-level

1. Open `/infinite-table`
2. Click **Show Table**
3. Observe a new JS chunk load for the table component

---

## ▶️ How to Run Locally

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## ✅ Daily Completion Checklist

* ✔ Context API implemented with working example
* ✔ Lazy loading configured for multiple components
* ✔ Infinite scroll pagination with API integration
* ✔ ESLint warnings resolved (Fast Refresh compatible)
* ✔ Performance audit completed using Lighthouse
* ✔ Code committed with clean structure and best practices

---

## 🧠 Key Takeaways

* Lazy loading drastically improves perceived performance
* Infinite scrolling requires both pagination and observer logic
* Performance audits are not optional in production apps
* React Context should be structured carefully to avoid re-render issues

---

## 📎 Future Enhancements

* Virtualized table (`react-window`)
* Server-side filtering & sorting
* Skeleton loaders
* Error retry & backoff
* Lighthouse CI integration

---

👨‍💻 Built as part of **Full-Stack Coursework – Day 1 Performance Lab**

