import React, { Suspense } from "react";
import Header from "./components/Header.jsx";
import Spinner from "./components/Spinner.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      <Header />

      {/* Route-level lazy loading happens under this Suspense */}
      <Suspense fallback={<Spinner label="Loading page..." />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}
