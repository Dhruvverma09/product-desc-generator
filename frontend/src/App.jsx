import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Showcase from "./pages/Showcase";
import Generate from "./pages/Generate";
import ProtectedRoute from "./components/ProtectedRoute";
import OAuthSuccess from "./pages/OAuthSuccess";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div style={{ backgroundColor: darkMode ? "#0f0f1a" : "#f5f5f5", minHeight: "100vh", transition: "all 0.3s" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/about" element={<About darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<Login darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/showcase" element={<Showcase darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          } />
          <Route path="/generate" element={
            <ProtectedRoute>
              <Generate darkMode={darkMode} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}