import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={styles.main}>
        <h1 style={styles.heading}>Login</h1>
        <p style={styles.para}>Authentication coming soon. Users will be able to log in to save their generated descriptions and manage product listing history.</p>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  main: { flex: 1, padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", width: "100%" },
  heading: { color: "#e94560", marginBottom: "1rem" },
  para: { color: "#444", lineHeight: "1.8", fontSize: "1.05rem" },
};
