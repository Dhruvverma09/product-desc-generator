import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";

export default function Login({ darkMode, toggleTheme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const bg = darkMode ? "#0f0f1a" : "#f5f5f5";
  const cardBg = darkMode ? "#1a1a2e" : "#fff";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ backgroundColor: cardBg, borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "#e94560", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: "0.95rem", marginBottom: "1.5rem" }}>Sign in to access your saved listings.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button label="Login - Coming Soon" variant="primary" onClick={() => { setToastVisible(true); setTimeout(() => setToastVisible(false), 3000); }} />
        </div>
      </main>
      <Toast message="Auth coming soon! Stay tuned." type="info" visible={toastVisible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}