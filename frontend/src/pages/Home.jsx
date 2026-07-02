import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader, Toast } from "../components/ui";
import { useNavigate } from "react-router-dom";

const HIMSHAKTI_PRODUCTS = [
  { name: "Barnyard Millet Namkeen", category: "Millet Snacks", features: "Gluten-free, high fibre, no maida, traditional Pahadi recipe, FSSAI certified" },
  { name: "Finger Millet (Mandua) Cookies", category: "Millet Snacks", features: "No refined sugar, no preservatives, made with local jaggery, rich in calcium" },
  { name: "Himalayan Kafal (Bay Berry) Pickle", category: "Fruit Pickles", features: "Wild-harvested, no artificial preservatives, traditional slow-fermented, unique to Uttarakhand" },
  { name: "Raw Apricot & Ginger Pickle", category: "Fruit Pickles", features: "Sun-ripened fruit, no vinegar, no artificial colour, grandma recipe" },
  { name: "Buransh (Rhododendron) Juice", category: "Juices", features: "Handpicked at 2000m altitude, antioxidant rich, no artificial colour" },
  { name: "Himalayan Wildflower Honey", category: "Honey", features: "Unfiltered, cold-extracted, no preservatives, lab tested, FSSAI certified" },
];

const CATEGORY_EMOJI = {
  "Millet Snacks": "🌾",
  "Fruit Pickles": "🍇",
  "Juices":        "🌸",
  "Honey":         "🍯",
  "Spices":        "🌶️",
  "Preserves":     "🫙",
  "Other":         "📦",
};

const HOW_IT_WORKS = [
  { step: "1", icon: "📝", title: "Enter Product Details", desc: "Add your product name, ingredients, weight, and key features." },
  { step: "2", icon: "🎯", title: "Choose a Tone", desc: "Pick Premium, Traditional, or Health-Focused based on who you're selling to." },
  { step: "3", icon: "✨", title: "Generate & Copy", desc: "Get an AI-written product description ready for Amazon or Flipkart." },
];

export default function Home({ darkMode, toggleTheme }) {
  const [products, setProducts] = useState(HIMSHAKTI_PRODUCTS); // fallback to static list
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState({ visible: false, message: "", type: "success" });
  const navigate = useNavigate();

  const showToast = (msg, type = "success") => {
    setToast({ visible: true, message: msg, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) setProducts(d.data);
        setLoading(false);
      })
      .catch(() => {
        // use static fallback, already set
        setLoading(false);
      });
  }, []);

  const bg      = darkMode ? "#0f0f1a" : "#f5f7fa";
  const text    = darkMode ? "#e8e8f0" : "#1a1a2e";
  const sub     = darkMode ? "#999"    : "#666";
  const cardBg  = darkMode ? "#1a1a2e" : "#ffffff";
  const border  = darkMode ? "#2a2a40" : "#e0e4ef";
  const secBg   = darkMode ? "#13131f" : "#ffffff";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#0f3460 100%)", padding: "4rem 2rem", textAlign: "center", color: "#fff" }}>
        <div style={{ display: "inline-block", backgroundColor: "rgba(233,69,96,0.15)", border: "1px solid rgba(233,69,96,0.3)", borderRadius: "20px", padding: "0.3rem 1rem", marginBottom: "1.2rem", fontSize: "0.82rem", color: "#e94560", fontWeight: "600" }}>
          ✦ AI Tool for Himalayan Food Businesses
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: "800", margin: "0 0 1rem", lineHeight: "1.2" }}>
          Write Product Descriptions<br />
          <span style={{ color: "#e94560" }}>That Actually Sell</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: "1.7" }}>
          HimShakti makes real products — millet snacks, fruit pickles, juices. This tool writes the Amazon &amp; Flipkart listings for them, fast.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/generate")}
            style={{ padding: "0.8rem 2rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "700", cursor: "pointer" }}
          >
            Try the Generator →
          </button>
          <button
            onClick={() => navigate("/about")}
            style={{ padding: "0.8rem 1.5rem", backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "8px", fontSize: "0.95rem", cursor: "pointer" }}
          >
            About the Project
          </button>
        </div>
      </section>

      {/* Problem statement */}
      <section style={{ backgroundColor: secBg, padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#e94560", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>The Problem</p>
          <h2 style={{ color: text, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: "800", marginBottom: "1rem" }}>
            Great products. Zero discoverability.
          </h2>
          <p style={{ color: sub, fontSize: "0.95rem", lineHeight: "1.8", margin: 0 }}>
            HimShakti is a small food processing unit near Haldwani, Uttarakhand. They produce genuinely high-quality millet snacks, wild-fruit pickles, and Himalayan juices — but have no writing capacity to compete on e-commerce. Without good product descriptions, even great products get buried in search results and don't convert buyers.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ backgroundColor: bg, padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#e94560", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>How It Works</p>
          <h2 style={{ textAlign: "center", color: text, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: "800", marginBottom: "3rem" }}>3 steps to a ready listing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.5rem" }}>
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} style={{ backgroundColor: secBg, borderRadius: "12px", padding: "2rem 1.5rem", border: `1px solid ${border}`, textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                <div style={{ color: "#e94560", fontWeight: "800", fontSize: "0.75rem", marginBottom: "0.5rem", letterSpacing: "0.06em" }}>STEP {item.step}</div>
                <h3 style={{ color: text, fontSize: "1rem", fontWeight: "700", marginBottom: "0.6rem" }}>{item.title}</h3>
                <p style={{ color: sub, fontSize: "0.88rem", lineHeight: "1.6", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product list */}
      <section style={{ backgroundColor: secBg, padding: "3.5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ textAlign: "center", color: "#e94560", fontWeight: "700", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>HimShakti Product Range</p>
          <h2 style={{ textAlign: "center", color: text, fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: "800", marginBottom: "0.6rem" }}>Products We Generate Listings For</h2>
          <p style={{ textAlign: "center", color: sub, fontSize: "0.9rem", marginBottom: "3rem" }}>
            Click on any product to generate its description →
          </p>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}><Loader size="md" /></div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.2rem" }}>
              {products.map((p, i) => (
                <div
                  key={p._id || i}
                  onClick={() => navigate("/generate")}
                  style={{ backgroundColor: bg, borderRadius: "12px", padding: "1.4rem", border: `1px solid ${border}`, cursor: "pointer", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#e94560"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = border}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.7rem" }}>
                    <span style={{ fontSize: "1.8rem" }}>{CATEGORY_EMOJI[p.category] || "📦"}</span>
                    <span style={{ backgroundColor: "rgba(233,69,96,0.1)", color: "#e94560", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.72rem", fontWeight: "600" }}>
                      {p.category}
                    </span>
                  </div>
                  <h3 style={{ color: text, fontSize: "0.95rem", fontWeight: "700", margin: "0 0 0.5rem" }}>{p.name}</h3>
                  <p style={{ color: sub, fontSize: "0.82rem", lineHeight: "1.5", margin: "0 0 0.9rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {p.features}
                  </p>
                  <span style={{ color: "#e94560", fontSize: "0.8rem", fontWeight: "600" }}>Generate description →</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#e94560", padding: "3.5rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: "800", marginBottom: "0.8rem" }}>
          Ready to create your first listing?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Takes about 30 seconds. No account needed.
        </p>
        <button
          onClick={() => navigate("/generate")}
          style={{ padding: "0.8rem 2rem", backgroundColor: "#fff", color: "#e94560", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "800", cursor: "pointer" }}
        >
          Start Generating ✨
        </button>
      </section>

      <Footer darkMode={darkMode} />
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  );
}