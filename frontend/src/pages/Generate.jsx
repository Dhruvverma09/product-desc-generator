import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader, Toast } from "../components/ui";
import API_BASE from "../config";

// Use karo:
// fetch(`${API_BASE}/api/generate`...
// fetch(`${API_BASE}/api/products`...

const CATEGORIES = ["Millet Snacks", "Fruit Pickles", "Juices", "Honey", "Spices", "Preserves", "Other"];
const TONES = ["Premium", "Traditional", "Health-Focused"];

const TONE_DESC = {
  Premium: "Luxury, high-end feel — good for gift buyers",
  Traditional: "Heritage, authentic Pahadi roots — good for loyal buyers",
  "Health-Focused": "Wellness, natural, organic feel — good for health buyers",
};

const EMPTY = { name: "", category: "Millet Snacks", weight: "", ingredients: "", features: "", tone: "Traditional" };

// HimShakti demo presets matching real products
const DEMOS = [
  {
    label: "🌾 Millet Namkeen",
    form: {
      name: "Barnyard Millet Namkeen",
      category: "Millet Snacks",
      weight: "200g",
      ingredients: "Barnyard millet, mustard oil, rock salt, cumin, dried chilli",
      features: "Gluten-free, high fibre, no maida, traditional Pahadi recipe, FSSAI certified",
      tone: "Health-Focused",
    },
  },
  {
    label: "🌾 Mandua Cookies",
    form: {
      name: "Finger Millet (Mandua) Cookies",
      category: "Millet Snacks",
      weight: "150g",
      ingredients: "Finger millet flour, jaggery, ghee, cardamom",
      features: "No refined sugar, no preservatives, made with local jaggery, rich in calcium and iron",
      tone: "Health-Focused",
    },
  },
  {
    label: "🍇 Kafal Pickle",
    form: {
      name: "Himalayan Kafal (Bay Berry) Pickle",
      category: "Fruit Pickles",
      weight: "250g",
      ingredients: "Wild kafal berries, mustard oil, himalayan rock salt, local spices",
      features: "Wild-harvested, no artificial preservatives, traditional slow-fermented, unique to Uttarakhand",
      tone: "Traditional",
    },
  },
  {
    label: "🍑 Apricot Pickle",
    form: {
      name: "Raw Apricot & Ginger Pickle",
      category: "Fruit Pickles",
      weight: "300g",
      ingredients: "Fresh apricots, ginger, mustard seeds, turmeric, himalayan salt",
      features: "Sun-ripened fruit, no vinegar, no artificial colour, grandma recipe, 6-month shelf life",
      tone: "Traditional",
    },
  },
  {
    label: "🌸 Buransh Juice",
    form: {
      name: "Buransh (Rhododendron) Juice",
      category: "Juices",
      weight: "500ml",
      ingredients: "Wild Rhododendron arboreum flowers, water, natural sugar",
      features: "Handpicked at 2000m altitude, antioxidant rich, no artificial colour, seasonal limited batch",
      tone: "Premium",
    },
  },
  {
    label: "🍯 Wildflower Honey",
    form: {
      name: "Himalayan Wildflower Honey",
      category: "Honey",
      weight: "500g",
      ingredients: "100% raw wildflower honey from Uttarakhand forests",
      features: "Unfiltered, cold-extracted, no preservatives, lab tested, FSSAI certified, hand-harvested",
      tone: "Premium",
    },
  },
];

export default function Generate({ darkMode, toggleTheme }) {
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const resultRef = useRef(null);

  // theme
  const bg = darkMode ? "#0f0f1a" : "#f5f7fa";
  const cardBg = darkMode ? "#1a1a2e" : "#ffffff";
  const text = darkMode ? "#e8e8f0" : "#1a1a2e";
  const sub = darkMode ? "#999" : "#666";
  const border = darkMode ? "#2a2a40" : "#e0e4ef";
  const inputBg = darkMode ? "#13131f" : "#f8f9fc";

  const showToast = (msg, type = "success") => {
    setToast({ visible: true, message: msg, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleGenerate = async () => {
    if (!form.name.trim()) { showToast("Product name is required", "error"); return; }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://himshakti-backend.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        setHistory((h) => [data.data, ...h].slice(0, 6));
        showToast("Description generated!", "success");
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        showToast(data.message || "Generation failed", "error");
      }
    } catch {
      showToast("Cannot reach server. Is backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.description) return;
    navigator.clipboard.writeText(result.description);
    setCopied(true);
    showToast("Copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result?.description) return;
    const text = `Product: ${result.productName}\nTone: ${result.tone}\n\n${result.description}`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${result.productName.replace(/\s+/g, "_")}_description.txt`;
    a.click();
    showToast("Downloaded!", "success");
  };

  const inputStyle = {
    width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px",
    border: `1px solid ${border}`, backgroundColor: inputBg,
    color: text, fontSize: "0.93rem", outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block", fontSize: "0.78rem", fontWeight: "600",
    color: sub, marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em",
  };

  const card = {
    backgroundColor: cardBg, borderRadius: "12px",
    border: `1px solid ${border}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    padding: "1.8rem",
    marginBottom: "1.4rem",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0f3460)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: "700", margin: "0 0 0.5rem" }}>
          Product Description Generator
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", margin: 0 }}>
          HimShakti — AI-powered listings for Amazon &amp; Flipkart
        </p>
      </div>

      <main style={{ flex: 1, padding: "2rem 1.5rem", maxWidth: "860px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Demo presets */}
        <div style={{ ...card }}>
          <p style={{ margin: "0 0 0.8rem", fontSize: "0.8rem", fontWeight: "600", color: "#e94560", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            ⚡ Try a product demo — click to fill the form
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {DEMOS.map((d) => {
              const active = form.name === d.form.name;
              return (
                <button
                  key={d.label}
                  onClick={() => { setForm(d.form); setResult(null); showToast(`Loaded: ${d.form.name}`, "success"); }}
                  style={{
                    padding: "0.4rem 0.9rem", borderRadius: "20px", cursor: "pointer",
                    border: `1.5px solid ${active ? "#e94560" : border}`,
                    backgroundColor: active ? "rgba(233,69,96,0.1)" : inputBg,
                    color: active ? "#e94560" : sub,
                    fontSize: "0.82rem", fontWeight: active ? "700" : "500",
                    fontFamily: "inherit", transition: "all 0.15s",
                  }}
                >{d.label}</button>
              );
            })}
            {form.name && (
              <button
                onClick={() => { setForm(EMPTY); setResult(null); }}
                style={{ padding: "0.4rem 0.9rem", borderRadius: "20px", cursor: "pointer", border: `1px solid ${border}`, backgroundColor: "transparent", color: sub, fontSize: "0.82rem", fontFamily: "inherit" }}
              >✕ Clear</button>
            )}
          </div>
        </div>

        {/* Form */}
        <div style={{ ...card }}>
          <h2 style={{ color: text, fontSize: "1rem", fontWeight: "700", margin: "0 0 1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            📝 Product Details
          </h2>

          {/* Row 1 — Name + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} placeholder="e.g. Barnyard Millet Namkeen" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2 — Weight + Ingredients */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={labelStyle}>Weight / Size</label>
              <input style={inputStyle} placeholder="e.g. 200g, 500ml" value={form.weight} onChange={set("weight")} />
            </div>
            <div>
              <label style={labelStyle}>Main Ingredients</label>
              <input style={inputStyle} placeholder="e.g. Barnyard millet, mustard oil" value={form.ingredients} onChange={set("ingredients")} />
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: "1.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label style={labelStyle}>Key Features</label>
              <span style={{ fontSize: "0.72rem", color: sub }}>{form.features.length}/300</span>
            </div>
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              placeholder="e.g. Gluten-free, FSSAI certified, no preservatives, traditional recipe..."
              value={form.features}
              maxLength={300}
              onChange={set("features")}
            />
          </div>

          {/* Tone */}
          <div style={{ marginBottom: "1.6rem" }}>
            <label style={labelStyle}>Tone Style</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.8rem" }}>
              {TONES.map((t) => {
                const active = form.tone === t;
                return (
                  <div
                    key={t}
                    onClick={() => setForm((f) => ({ ...f, tone: t }))}
                    style={{
                      padding: "0.9rem 0.7rem", borderRadius: "10px", cursor: "pointer", textAlign: "center",
                      border: `2px solid ${active ? "#e94560" : border}`,
                      backgroundColor: active ? "rgba(233,69,96,0.08)" : inputBg,
                    }}
                  >
                    <div style={{ fontWeight: "700", fontSize: "0.85rem", color: active ? "#e94560" : text, marginBottom: "0.25rem" }}>{t}</div>
                    <div style={{ fontSize: "0.72rem", color: sub, lineHeight: "1.3" }}>{TONE_DESC[t]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                padding: "0.8rem 1.8rem", backgroundColor: loading ? "#888" : "#e94560",
                color: "#fff", border: "none", borderRadius: "8px",
                fontSize: "0.95rem", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: "0.4rem",
              }}
            >
              {loading ? <><Loader size="sm" /> Generating...</> : "✨ Generate Description"}
            </button>
            <button
              onClick={() => { setForm(EMPTY); setResult(null); }}
              style={{ padding: "0.8rem 1.2rem", background: "transparent", color: sub, border: `1px solid ${border}`, borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {(loading || result) && (
          <div ref={resultRef} style={{ ...card, border: result ? "1px solid #e94560" : `1px solid ${border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ color: text, fontSize: "1rem", fontWeight: "700", margin: 0 }}>✨ Generated Description</h2>
              {result && (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span style={{ backgroundColor: "rgba(233,69,96,0.1)", color: "#e94560", padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600" }}>
                    {result.tone}
                  </span>
                  <button onClick={handleCopy} style={{ padding: "0.3rem 0.9rem", backgroundColor: copied ? "#16a34a" : "transparent", color: copied ? "#fff" : "#e94560", border: `1px solid ${copied ? "#16a34a" : "#e94560"}`, borderRadius: "6px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" }}>
                    {copied ? "✓ Copied" : "📋 Copy"}
                  </button>
                  <button onClick={handleDownload} style={{ padding: "0.3rem 0.9rem", backgroundColor: "transparent", color: sub, border: `1px solid ${border}`, borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>
                    📥 Save
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: sub, padding: "1rem 0" }}>
                <Loader size="sm" /> <span>AI is writing your description…</span>
              </div>
            ) : result ? (
              <>
                <p style={{ color: text, lineHeight: "1.85", fontSize: "0.95rem", margin: "0 0 1rem", padding: "1rem", backgroundColor: inputBg, borderRadius: "8px", borderLeft: "3px solid #e94560" }}>
                  {result.description}
                </p>
                <p style={{ color: sub, fontSize: "0.78rem", margin: 0 }}>
                  Product: <strong style={{ color: text }}>{result.productName}</strong> &nbsp;•&nbsp; {result.description.trim().split(/\s+/).length} words &nbsp;•&nbsp; Saved to database ✅
                </p>
              </>
            ) : null}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ ...card }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ color: text, fontSize: "1rem", fontWeight: "700", margin: 0 }}>
                🕐 Session History ({history.length})
              </h2>
              <button onClick={() => setHistory([])} style={{ background: "transparent", border: `1px solid ${border}`, color: sub, padding: "0.25rem 0.7rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer" }}>
                Clear
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {history.map((h, i) => (
                <div
                  key={i}
                  onClick={() => setResult(h)}
                  style={{ padding: "0.9rem 1rem", borderRadius: "8px", backgroundColor: inputBg, border: `1px solid ${border}`, cursor: "pointer" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: "600", color: text, fontSize: "0.88rem" }}>{h.productName}</span>
                    <span style={{ backgroundColor: "rgba(233,69,96,0.1)", color: "#e94560", padding: "0.15rem 0.6rem", borderRadius: "12px", fontSize: "0.73rem", fontWeight: "600" }}>{h.tone}</span>
                  </div>
                  <p style={{ color: sub, fontSize: "0.82rem", margin: 0, lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
