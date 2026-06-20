export default function Card({ title, description, tag }) {
  return (
    <div style={styles.card}>
      <span style={styles.tag}>{tag || "Food Processing"}</span>
      <h3 style={styles.title}>{title || "Product Name"}</h3>
      <p style={styles.desc}>{description || "AI-generated description will appear here."}</p>
      <button style={styles.btn}>Generate Description</button>
    </div>
  );
}

const styles = {
  card: { backgroundColor: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "0.8rem" },
  tag: { backgroundColor: "#e9f5e9", color: "#2d6a2d", padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.8rem", width: "fit-content" },
  title: { fontSize: "1.2rem", color: "#1a1a2e", margin: 0 },
  desc: { color: "#555", fontSize: "0.95rem", lineHeight: "1.6" },
  btn: { padding: "0.6rem 1.2rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "fit-content" },
};
