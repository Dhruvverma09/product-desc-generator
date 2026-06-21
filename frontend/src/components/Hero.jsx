import { Button } from "./ui";

export default function Hero({ darkMode }) {
    return (
        <section style={{
            backgroundColor: darkMode ? "#16213e" : "#e94560",
            color: "#fff",
            padding: "5rem 2rem",
            textAlign: "center",
            transition: "all 0.3s"
        }}>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "1rem", color: "#fff" }}>
                AI-Powered Product Descriptions
            </h1>
            <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem", color: darkMode ? "#ccc" : "rgba(255,255,255,0.85)" }}>
                Generate compelling, SEO-optimized listings for Amazon & Flipkart in seconds.
            </p>
            <Button
                label="Get Started"
                variant={darkMode ? "primary" : "secondary"}
                onClick={() => window.location.href = "/showcase"}
            />
        </section>
    );
}