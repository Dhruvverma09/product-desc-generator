import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Loader, Toast } from "../components/ui";

export default function Home({ darkMode, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch(() => {
        showToast("Failed to load products from server!", "error");
        setLoading(false);
      });
  }, []);

  const pageBg = darkMode ? "#0f0f1a" : "#f5f5f5";
  const textColor = darkMode ? "#f0f0f0" : "#1a1a2e";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: pageBg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero darkMode={darkMode} />
      <main style={{ padding: "3rem 2rem", flex: 1 }}>
        <h2 style={{ textAlign: "center", color: textColor, marginBottom: "2rem", fontSize: "1.8rem" }}>
          Product Listings
        </h2>
        {loading ? (
          <Loader size="md" />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
            {products.map((p) => (
              <Card key={p.id} title={p.name} description={p.features} tag={p.category} darkMode={darkMode} />
            ))}
          </div>
        )}
      </main>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}