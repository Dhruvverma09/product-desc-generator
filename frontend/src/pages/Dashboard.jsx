import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toast, Loader } from "../components/ui";
import { useAuth } from "../context/AuthContext";

const API = "https://himshakti-backend.onrender.com/api/products";

const CATEGORIES = ["Millet Snacks", "Fruit Pickles", "Juices", "Honey", "Spices", "Preserves", "Other"];
const TONES = ["Premium", "Traditional", "Health-Focused"];
const EMPTY_FORM = { name: "", category: "Honey", weight: "", ingredients: "", features: "", tone: "Premium" };

export default function Dashboard({ darkMode, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const { token } = useAuth();

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

  // ── FETCH all products ─────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data.data || []);
    } catch {
      showToast("Cannot reach server!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── SAVE (Create or Update) ────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim()) { showToast("Product name is required", "error"); return; }
    setSaving(true);
    try {
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showToast(editId ? "Product updated ✅" : "Product created ✅");
        setForm(EMPTY_FORM);
        setEditId(null);
        setShowForm(false);
        fetchProducts();
      } else {
        showToast(data.message || "Save failed", "error");
      }
    } catch {
      showToast("Server error", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ─────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      }); showToast("Product deleted 🗑️");
      fetchProducts();
    } catch {
      showToast("Delete failed", "error");
    } finally {
      setDeleting(null);
    }
  };

  // ── EDIT — prefill form ────────────────────────────────────────
  const handleEdit = (p) => {
    setForm({ name: p.name, category: p.category, weight: p.weight || "", ingredients: p.ingredients || "", features: p.features || "", tone: p.tone || "Premium" });
    setEditId(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputStyle = { width: "100%", padding: "0.7rem 0.9rem", borderRadius: "8px", border: `1px solid ${border}`, backgroundColor: inputBg, color: text, fontSize: "0.92rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  const labelStyle = { display: "block", fontSize: "0.75rem", fontWeight: "600", color: sub, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.04em" };
  const card = { backgroundColor: cardBg, borderRadius: "12px", border: `1px solid ${border}`, padding: "1.5rem", marginBottom: "1.2rem", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" };

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦" },
    { label: "Categories", value: [...new Set(products.map((p) => p.category))].length, icon: "🗂️" },
    { label: "Tones Used", value: [...new Set(products.map((p) => p.tone))].length, icon: "🎨" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0f3460)", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: "700", margin: "0 0 0.4rem" }}>
          Product Dashboard
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>
          Manage HimShakti products — Create, Read, Update, Delete
        </p>
      </div>

      <main style={{ flex: 1, padding: "2rem 1.5rem", maxWidth: "960px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ ...card, marginBottom: 0, textAlign: "center", padding: "1.2rem" }}>
              <div style={{ fontSize: "1.6rem" }}>{s.icon}</div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#e94560" }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", color: sub }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{ color: text, margin: 0, fontSize: "1.05rem", fontWeight: "700" }}>
            All Products ({products.length})
          </h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={fetchProducts} style={{ padding: "0.5rem 1rem", background: "transparent", border: `1px solid ${border}`, borderRadius: "7px", color: sub, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              🔄 Refresh
            </button>
            <button
              onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(!showForm); }}
              style={{ padding: "0.5rem 1.2rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "7px", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer" }}
            >
              {showForm && !editId ? "✕ Cancel" : "+ Add Product"}
            </button>
          </div>
        </div>

        {/* CREATE / EDIT Form */}
        {showForm && (
          <div style={{ ...card, border: "1px solid #e94560" }}>
            <h3 style={{ color: "#e94560", margin: "0 0 1.2rem", fontSize: "0.95rem", fontWeight: "700" }}>
              {editId ? "✏️ Edit Product" : "➕ Add New Product"}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginBottom: "0.9rem" }}>
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} placeholder="e.g. Himalayan Honey" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Weight / Size</label>
                <input style={inputStyle} placeholder="e.g. 500g" value={form.weight} onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))} />
              </div>
              <div>
                <label style={labelStyle}>Tone</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.tone} onChange={(e) => setForm((f) => ({ ...f, tone: e.target.value }))}>
                  {TONES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "0.9rem" }}>
              <label style={labelStyle}>Ingredients</label>
              <input style={inputStyle} placeholder="e.g. Pure wildflower honey" value={form.ingredients} onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))} />
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={labelStyle}>Key Features</label>
              <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }} placeholder="e.g. Raw, unfiltered, FSSAI certified..." value={form.features} onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))} />
            </div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: "0.7rem 1.6rem", backgroundColor: saving ? "#888" : "#e94560", color: "#fff", border: "none", borderRadius: "7px", fontSize: "0.9rem", fontWeight: "700", cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                {saving ? <><Loader size="sm" /> Saving...</> : (editId ? "💾 Update" : "✅ Create")}
              </button>
              <button
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setEditId(null); }}
                style={{ padding: "0.7rem 1.2rem", background: "transparent", border: `1px solid ${border}`, borderRadius: "7px", color: sub, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}><Loader size="md" /></div>
        ) : products.length === 0 ? (
          <div style={{ ...card, textAlign: "center", padding: "3rem", color: sub }}>
            No products yet — click "+ Add Product" to create one!
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {products.map((p) => (
              <div key={p._id} style={{ ...card, marginBottom: 0, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                    <h3 style={{ color: text, margin: 0, fontSize: "0.95rem", fontWeight: "700" }}>{p.name}</h3>
                    <span style={{ backgroundColor: "rgba(233,69,96,0.1)", color: "#e94560", padding: "0.15rem 0.6rem", borderRadius: "12px", fontSize: "0.73rem", fontWeight: "600" }}>{p.tone}</span>
                    <span style={{ backgroundColor: inputBg, color: sub, padding: "0.15rem 0.6rem", borderRadius: "12px", fontSize: "0.73rem", border: `1px solid ${border}` }}>{p.category}</span>
                  </div>
                  <p style={{ color: sub, fontSize: "0.82rem", margin: 0 }}>
                    {p.weight && <span>⚖️ {p.weight} &nbsp;</span>}
                    {p.ingredients && <span>🌿 {p.ingredients.slice(0, 50)}{p.ingredients.length > 50 ? "..." : ""}</span>}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{ padding: "0.4rem 0.9rem", backgroundColor: "transparent", border: `1px solid ${border}`, borderRadius: "6px", color: text, fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={deleting === p._id}
                    style={{ padding: "0.4rem 0.9rem", backgroundColor: deleting === p._id ? "#888" : "rgba(233,69,96,0.1)", border: "1px solid #e94560", borderRadius: "6px", color: "#e94560", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {deleting === p._id ? "..." : "🗑️ Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <Footer darkMode={darkMode} />
    </div>
  );
}