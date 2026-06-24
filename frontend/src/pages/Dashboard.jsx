import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Toast, Loader } from "../components/ui";

export default function Dashboard({ darkMode, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
        showToast("Products loaded successfully!", "success");
      })
      .catch(() => {
        showToast("Failed to fetch products!", "error");
        setLoading(false);
      });
  };

  useEffect(() => { fetchProducts(); }, []);

  const bg = darkMode ? "#0f0f1a" : "#f5f5f5";
  const cardBg = darkMode ? "#1a1a2e" : "#fff";
  const textColor = darkMode ? "#f0f0f0" : "#1a1a2e";

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Categories", value: [...new Set(products.map((p) => p.category))].length },
    { label: "Tones Used", value: [...new Set(products.map((p) => p.tone))].length },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
          <h1 style={{ color: "#e94560" }}>Dashboard</h1>
          <Button label="Refresh" variant="secondary" onClick={fetchProducts} />
        </div>
        <p style={{ color: darkMode ? "#aaa" : "#444", lineHeight: "1.8", marginBottom: "2rem" }}>
          Live data from HimShakti ListingAI backend API.
        </p>

        {loading ? <Loader size="md" /> : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ backgroundColor: cardBg, borderRadius: "12px", padding: "2rem", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" }}>
                  <h2 style={{ fontSize: "2.5rem", color: "#e94560", margin: 0 }}>{s.value}</h2>
                  <p style={{ color: darkMode ? "#aaa" : "#666", marginTop: "0.5rem" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <h2 style={{ color: textColor, marginBottom: "1rem" }}>All Products</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {products.map((p) => (
                <div key={p.id} style={{ backgroundColor: cardBg, borderRadius: "10px", padding: "1.2rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <h3 style={{ color: textColor, margin: 0 }}>{p.name}</h3>
                    <p style={{ color: darkMode ? "#aaa" : "#666", fontSize: "0.9rem", margin: "0.2rem 0 0" }}>{p.category} • {p.weight} • {p.tone}</p>
                  </div>
                  <span style={{ backgroundColor: "#e9f5e9", color: "#2d6a2d", padding: "0.2rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem" }}>ID: {p.id}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}