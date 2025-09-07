import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Notify from "./components/Notify";

// ✅ Lazy load components
const AnimatedLoader = lazy(() => import("./components/AnimateLoader"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SettingsPage = lazy(() => import("./Pages/SettingsPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Show loader while checking authentication
  if (isCheckingAuth && !authUser) {
    return (
      <Suspense fallback={<div className="h-screen bg-black"><AnimatedLoader /></div>}>
        <AnimatedLoader />
      </Suspense>
    );
  }

  return (
    <div>
      <Navbar />

      <Suspense fallback={<div className="h-screen bg-black"><AnimatedLoader /></div>}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
      <Notify />
    </div>
  );
}

export default App;
