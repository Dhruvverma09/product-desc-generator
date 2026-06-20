import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>?? HimShakti ListingAI</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#1a1a2e", color: "#fff", flexWrap: "wrap", gap: "1rem" },
  brand: { fontSize: "1.3rem", fontWeight: "bold", color: "#e94560" },
  links: { display: "flex", gap: "1.5rem", flexWrap: "wrap" },
  link: { color: "#fff", textDecoration: "none", fontSize: "0.95rem" },
};
