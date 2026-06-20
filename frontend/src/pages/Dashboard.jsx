import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { label: "Descriptions Generated", value: "0" },
  { label: "Products Added", value: "0" },
  { label: "Tones Used", value: "0" },
];

export default function Dashboard() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.heading}>Dashboard</h1>
        <p style={styles.para}>Your generated product descriptions will appear here. Track your listings, manage tone preferences, and copy output directly to your e-commerce store.</p>
        <div style={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} style={styles.card}>
              <h2 style={styles.value}>{s.value}</h2>
              <p style={styles.label}>{s.label}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  main: { flex: 1, padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" },
  heading: { color: "#e94560", marginBottom: "1rem" },
  para: { color: "#444", lineHeight: "1.8", fontSize: "1.05rem", marginBottom: "2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" },
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" },
  value: { fontSize: "2.5rem", color: "#e94560", margin: 0 },
  label: { color: "#666", marginTop: "0.5rem", fontSize: "0.95rem" },
};
