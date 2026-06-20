import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.heading}>About HimShakti ListingAI</h1>
        <p style={styles.para}>HimShakti ListingAI is an AI-powered tool designed to help small food processing businesses generate compelling product listings for e-commerce platforms like Amazon and Flipkart. Built as part of the TBI-GEU Summer Internship Program 2026.</p>
        <div style={styles.card}>
          <h2 style={styles.subheading}>Our Mission</h2>
          <p style={styles.para}>To empower Himalayan food entrepreneurs with AI tools that make professional e-commerce listing accessible to everyone.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.subheading}>Sector</h2>
          <p style={styles.para}>Food Processing — helping producers of honey, spices, oils, and preserves reach wider markets through better product storytelling.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  main: { flex: 1, padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", width: "100%" },
  heading: { color: "#e94560", marginBottom: "1.5rem" },
  subheading: { color: "#1a1a2e", marginBottom: "0.5rem", fontSize: "1.2rem" },
  para: { color: "#444", lineHeight: "1.8", fontSize: "1.05rem" },
  card: { backgroundColor: "#fff", borderRadius: "10px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" },
};
