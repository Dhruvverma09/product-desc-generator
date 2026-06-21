import { Button } from "./ui";

export default function Card({ title, description, tag, darkMode }) {
    const cardBg = darkMode ? "#1a1a2e" : "#fff";
    const titleColor = darkMode ? "#f0f0f0" : "#1a1a2e";
    const descColor = darkMode ? "#aaa" : "#555";

    return (
        <div style={{ backgroundColor: cardBg, borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <span style={{ backgroundColor: "#e9f5e9", color: "#2d6a2d", padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.8rem", width: "fit-content" }}>{tag}</span>
            <h3 style={{ fontSize: "1.2rem", color: titleColor, margin: 0 }}>{title}</h3>
            <p style={{ color: descColor, fontSize: "0.95rem", lineHeight: "1.6" }}>{description}</p>
            <Button label="Generate Description" variant="primary" onClick={() => { }} />
        </div>
    );
}