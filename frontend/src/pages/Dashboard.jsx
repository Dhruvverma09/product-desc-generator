import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Toast, Loader } from "../components/ui";

const stats = [
  { label: "Descriptions Generated", value: "0" },
  { label: "Products Added", value: "0" },
  { label: "Tones Used", value: "0" },
];

export default function Dashboard({ darkMode, toggleTheme }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const bg = darkMode ? "#0f0f1a" : "#f5f5f5";
  const cardBg = darkMode ? "#1a1a2e" : "#fff";
  const textColor = darkMode ? "#f0f0f0" : "#1a1a2e";

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setToastVisible(true); setTimeout(() => setToastVisible(false), 3000); }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
          <h1 style={{ color: "#e94560" }}>Dashboard</h1>
          <Button label="Refresh Stats" variant="secondary" onClick={handleRefresh} />
        </div>
        <p style={{ color: darkMode ? "#aaa" : "#444", lineHeight: "1.8", marginBottom: "2rem" }}>Your generated product descriptions will appear here.</p>
        {loading ? <Loader size="md" /> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ backgroundColor: cardBg, borderRadius: "12px", padding: "2rem", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
                <h2 style={{ fontSize: "2.5rem", color: "#e94560", margin: 0 }}>{s.value}</h2>
                <p style={{ color: darkMode ? "#aaa" : "#666", marginTop: "0.5rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Toast message="Stats refreshed!" type="success" visible={toastVisible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}