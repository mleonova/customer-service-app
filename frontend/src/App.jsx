import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from './modules/Home/HomePage';
import SignupPage from './modules/Signup/SignupPage';
import LoginPage from './modules/Login/LoginPage';
import Dashboard from './modules/Dashboard/Dashboard';

function App() {
  const isAuthenticated = localStorage.getItem("agent_id");

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
