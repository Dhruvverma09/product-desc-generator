import { Button } from "./ui";
import { useNavigate } from "react-router-dom";

export default function Hero({ darkMode }) {
    const navigate = useNavigate();

    return (
        <section style={{ position: "relative", overflow: "hidden", padding: "5rem 2rem 4rem", background: darkMode ? "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)" : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#fff", textAlign: "center" }}>

            {/* Background decorative circles */}
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "rgba(233,69,96,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "rgba(233,69,96,0.06)", pointerEvents: "none" }} />

            <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "rgba(233,69,96,0.15)", border: "1px solid rgba(233,69,96,0.3)", borderRadius: "20px", padding: "0.3rem 1rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#e94560" }}>
                    <span>✦</span> AI-Powered • Amazon & Flipkart Ready
                </div>

                <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", marginBottom: "1.2rem", lineHeight: "1.2", color: "#fff" }}>
                    Generate Product Descriptions<br />
                    <span style={{ color: "#e94560" }}>That Actually Sell</span>
                </h1>

                <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.7)", maxWidth: "550px", margin: "0 auto 2rem", lineHeight: "1.7" }}>
                    Built for Himalayan food processing businesses. Input your product details, choose a tone, and get SEO-optimized listings instantly.
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <Button label="Try It Now →" variant="primary" onClick={() => navigate("/dashboard")} />
                    <button onClick={() => navigate("/about")} style={{ padding: "0.7rem 1.5rem", backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", fontSize: "0.95rem", cursor: "pointer" }}>
                        Learn More
                    </button>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
                    {[["7+", "API Endpoints"], ["3", "Tone Styles"], ["2", "Platforms"]].map(([val, label]) => (
                        <div key={label} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#e94560" }}>{val}</div>
                            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}