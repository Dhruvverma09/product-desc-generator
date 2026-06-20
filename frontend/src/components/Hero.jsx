export default function Hero() {
  return (
    <section style={styles.hero}>
      <h1 style={styles.heading}>AI-Powered Product Descriptions</h1>
      <p style={styles.sub}>Generate compelling, SEO-optimized listings for Amazon & Flipkart in seconds.</p>
      <button style={styles.btn}>Get Started</button>
    </section>
  );
}

const styles = {
  hero: { backgroundColor: "#16213e", color: "#fff", padding: "4rem 2rem", textAlign: "center" },
  heading: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "1rem", color: "#e94560" },
  sub: { fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem", color: "#ccc" },
  btn: { padding: "0.8rem 2rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" },
};
