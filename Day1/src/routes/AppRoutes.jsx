import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home.jsx"));
const Users = React.lazy(() => import("../pages/Users.jsx"));
const Settings = React.lazy(() => import("../pages/Settings.jsx"));
const InfiniteTable = React.lazy(() => import("../pages/InfiniteTable.jsx"));
const NotFound = React.lazy(() => import("../pages/NotFound.jsx"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/infinite-table" element={<InfiniteTable />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
