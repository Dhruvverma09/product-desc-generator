import { Button } from "./ui";

const categoryImages = {
    Honey: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
    Oils: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
    Spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    Preserves: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80",
    Default: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
};

export default function Card({ title, description, tag, darkMode, onGenerate }) {
    const cardBg = darkMode ? "#1a1a2e" : "#ffffff";
    const titleColor = darkMode ? "#f0f0f0" : "#1a1a2e";
    const descColor = darkMode ? "#aaa" : "#666";
    const imgSrc = categoryImages[tag] || categoryImages.Default;

    return (
        <div style={{ backgroundColor: cardBg, borderRadius: "16px", overflow: "hidden", boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(233,69,96,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = darkMode ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.08)"; }}>

            {/* Image */}
            <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
                <img src={imgSrc} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4))" }} />
                <span style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "#e94560", color: "#fff", padding: "0.2rem 0.7rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" }}>{tag}</span>
            </div>

            {/* Content */}
            <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                <h3 style={{ fontSize: "1rem", color: titleColor, margin: 0, fontWeight: "700" }}>{title}</h3>
                <p style={{ color: descColor, fontSize: "0.88rem", lineHeight: "1.6", flex: 1 }}>{description}</p>
                <Button label="Generate Description" variant="primary" onClick={onGenerate || (() => { })} />
            </div>
        </div>
    );
}