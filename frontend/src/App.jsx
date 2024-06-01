import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './modules/Home/HomePage';
import SignupPage from './modules/Signup/SignupPage';
import LoginPage from './modules/Login/LoginPage';
import Dashboard from './modules/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
