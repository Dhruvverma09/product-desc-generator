import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About({ darkMode, toggleTheme }) {
  const bg = darkMode ? "#0f0f1a" : "#f5f5f5";
  const cardBg = darkMode ? "#1a1a2e" : "#fff";
  const textColor = darkMode ? "#ccc" : "#444";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ color: "#e94560", marginBottom: "1.5rem" }}>About HimShakti ListingAI</h1>
        <p style={{ color: textColor, lineHeight: "1.8", fontSize: "1.05rem" }}>
          HimShakti ListingAI is an AI-powered tool designed to help small food processing businesses generate compelling product listings for e-commerce platforms like Amazon and Flipkart. Built as part of the TBI-GEU Summer Internship Program 2026.
        </p>
        <div style={{ backgroundColor: cardBg, borderRadius: "10px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: darkMode ? "#f0f0f0" : "#1a1a2e", marginBottom: "0.5rem", fontSize: "1.2rem" }}>Our Mission</h2>
          <p style={{ color: textColor, lineHeight: "1.8" }}>To empower Himalayan food entrepreneurs with AI tools that make professional e-commerce listing accessible to everyone.</p>
        </div>
        <div style={{ backgroundColor: cardBg, borderRadius: "10px", padding: "1.5rem", marginTop: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: darkMode ? "#f0f0f0" : "#1a1a2e", marginBottom: "0.5rem", fontSize: "1.2rem" }}>Sector</h2>
          <p style={{ color: textColor, lineHeight: "1.8" }}>Food Processing — helping producers of honey, spices, oils, and preserves reach wider markets.</p>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}