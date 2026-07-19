import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Login({ darkMode, toggleTheme }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const bg = darkMode ? "#0f0f1a" : "#f5f7fa";
  const cardBg = darkMode ? "#1a1a2e" : "#ffffff";
  const text = darkMode ? "#e8e8f0" : "#1a1a2e";
  const sub = darkMode ? "#999" : "#666";
  const border = darkMode ? "#2a2a40" : "#e0e4ef";
  const inputBg = darkMode ? "#13131f" : "#f8f9fc";

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "8px",
    border: `1px solid ${border}`, backgroundColor: inputBg,
    color: text, fontSize: "0.95rem", outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };
  const labelStyle = {
    display: "block", fontSize: "0.78rem", fontWeight: "600",
    color: sub, marginBottom: "0.4rem", textTransform: "uppercase",
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!form.email || !form.password) { setError("Email aur Password required hai!"); return; }
    if (isRegister && !form.name) { setError("Name required hai!"); return; }

    const result = isRegister
      ? await register(form.name, form.email, form.password)
      : await login(form.email, form.password);

    if (result.success) {
      setSuccess(isRegister ? "Account bana gaya! 🎉" : "Login successful! ✅");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ backgroundColor: cardBg, borderRadius: "16px", padding: "2.5rem", width: "100%", maxWidth: "440px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)", border: `1px solid ${border}` }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: "50px", height: "50px", backgroundColor: "#e94560", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>
              {isRegister ? "✨" : "👋"}
            </div>
            <h1 style={{ color: text, fontSize: "1.5rem", fontWeight: "800", margin: "0 0 0.4rem" }}>
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>
            <p style={{ color: sub, fontSize: "0.9rem", margin: 0 }}>
              {isRegister ? "HimShakti ListingAI pe join karo" : "Apne account mein login karo"}
            </p>
          </div>

          {/* Error / Success */}
          {error && (
            <div style={{ backgroundColor: "rgba(233,69,96,0.1)", border: "1px solid #e94560", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1rem", color: "#e94560", fontSize: "0.88rem" }}>
              ❌ {error}
            </div>
          )}
          {success && (
            <div style={{ backgroundColor: "rgba(45,106,45,0.1)", border: "1px solid #2d6a2d", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1rem", color: "#2d6a2d", fontSize: "0.88rem" }}>
              {success}
            </div>
          )}

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {isRegister && (
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} placeholder="Dhruv Verma" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", padding: "0.85rem", backgroundColor: loading ? "#888" : "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", marginBottom: "1rem" }}
          >
            {loading ? "Please wait..." : (isRegister ? "✨ Create Account" : "🚀 Login")}
          </button>

          {/* Divider */}
          <div style={{ textAlign: "center", margin: "1rem 0", color: sub }}>— ya —</div>

          {/* Google Button */}
          <a
            href="https://.onrender.com/api/auth/google"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem", width: "100%", padding: "0.85rem", backgroundColor: "#fff", color: "#333", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.95rem", fontWeight: "600", textDecoration: "none", boxSizing: "border-box" }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="Google" />
            Sign in with Google
          </a>

          {/* Toggle */}
          <p style={{ textAlign: "center", color: sub, fontSize: "0.9rem", margin: "1rem 0 0" }}>
            {isRegister ? "Already account hai? " : "Account nahi hai? "}
            <span onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess(""); }} style={{ color: "#e94560", fontWeight: "600", cursor: "pointer" }}>
              {isRegister ? "Login karo" : "Register karo"}
            </span>
          </p>

        </div>
      </main >

      <Footer darkMode={darkMode} />
    </div >
  );
}