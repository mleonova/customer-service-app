import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./modules/Home/HomePage";
import SignupPage from "./modules/Signup/SignupPage";
import LoginPage from "./modules/Login/LoginPage";
import Dashboard from "./modules/Dashboard/Dashboard";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));

    const checkAuthentication = () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <h3>Loading...</h3>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
