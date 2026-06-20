import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Welcome Back</h1>
          <p style={styles.para}>Sign in to access your product description history and saved listings.</p>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input style={styles.input} type="email" placeholder="you@example.com" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" placeholder="••••••••" />
          </div>
          <button style={styles.btn}>Login — Coming Soon</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  main: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", backgroundColor: "#f5f5f5" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
  heading: { color: "#e94560", marginBottom: "0.5rem" },
  para: { color: "#666", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: "1.6" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.2rem" },
  label: { fontSize: "0.9rem", color: "#333", fontWeight: "600" },
  input: { padding: "0.7rem 1rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.95rem", outline: "none" },
  btn: { width: "100%", padding: "0.8rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "not-allowed", marginTop: "0.5rem" },
};
