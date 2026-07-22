import { Link } from "react-router-dom";

export default function Footer({ darkMode }) {
    const bg = darkMode ? "#0a0a1a" : "#1a1a2e";

    return (
        <footer style={{ backgroundColor: bg, color: "#aaa", padding: "3rem 2rem 1.5rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 640 ? "1fr" : "2fr 1fr 1fr", gap: window.innerWidth < 640 ? "2rem" : "3rem", marginBottom: "2.5rem" }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <div style={{ width: "32px", height: "32px", backgroundColor: "#e94560", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "1rem" }}>H</div>
                            <span style={{ color: "#fff", fontWeight: "700", fontSize: "1.1rem" }}>HimShakti ListingAI</span>
                        </div>
                        <p style={{ fontSize: "0.88rem", lineHeight: "1.7", color: "#666", maxWidth: "280px" }}>
                            AI-powered product descriptions for Himalayan food processing businesses. Generate SEO-optimized listings for Amazon & Flipkart instantly.
                        </p>
                        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
                            {["Amazon", "Flipkart"].map((p) => (
                                <span key={p} style={{ backgroundColor: "rgba(233,69,96,0.12)", color: "#e94560", padding: "0.25rem 0.7rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600", border: "1px solid rgba(233,69,96,0.2)" }}>{p}</span>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{ color: "#fff", marginBottom: "1.2rem", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "0.05em" }}>Navigation</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                            {[["Home", "/"], ["About", "/about"], ["Dashboard", "/dashboard"], ["Login", "/login"], ["Components", "/showcase"]].map(([label, to]) => (
                                <Link key={to} to={to} style={{ color: "#666", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                                    onMouseEnter={e => e.target.style.color = "#e94560"}
                                    onMouseLeave={e => e.target.style.color = "#666"}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 style={{ color: "#fff", marginBottom: "1.2rem", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "0.05em" }}>Tech Stack</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                            {[["⚛️", "React JS (Vite)"], ["🟢", "Node + Express"], ["🍃", "MongoDB Atlas"], ["🤖", "LLM (API)"]].map(([icon, tech]) => (
                                <span key={tech} style={{ color: "#666", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    <span>{icon}</span> {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: "1px solid #1f1f2e", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.8rem" }}>
                    <p style={{ fontSize: "0.8rem", color: "#444" }}>© 2026 HimShakti ListingAI — TBI-GEU Summer Internship Program 2026</p>
                    <p style={{ fontSize: "0.8rem", color: "#444" }}>Made with ❤️ by Dhruv Verma</p>
                </div>
            </div>
        </footer>
    );
}