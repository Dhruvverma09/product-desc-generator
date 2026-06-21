import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ darkMode, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const bg = darkMode ? "#0a0a1a" : "#ffffff";
    const linkColor = darkMode ? "#fff" : "#1a1a2e";

    return (
        <nav style={{ backgroundColor: bg, boxShadow: darkMode ? "none" : "0 2px 10px rgba(0,0,0,0.08)", padding: "1rem 2rem", position: "sticky", top: 0, zIndex: 100, transition: "all 0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                {/* Brand */}
                <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#e94560" }}>
                    HimShakti ListingAI
                </div>

                {/* Desktop links */}
                <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }} className="desktop-nav">
                    {["/", "/about", "/dashboard", "/login", "/showcase"].map((path, i) => (
                        <Link key={i} to={path} style={{ color: linkColor, textDecoration: "none", fontSize: "0.95rem", fontWeight: "500" }}>
                            {["Home", "About", "Dashboard", "Login", "Components"][i]}
                        </Link>
                    ))}
                    <button onClick={toggleTheme} title={darkMode ? "Switch to Light" : "Switch to Dark"} style={styles.iconBtn}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>

                {/* Mobile: hamburger + theme toggle */}
                <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }} className="mobile-nav">
                    <button onClick={toggleTheme} title="Toggle theme" style={styles.iconBtn}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                    <button onClick={() => setMenuOpen(!menuOpen)} style={{ ...styles.iconBtn, fontSize: "1.4rem" }}>
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1rem", borderTop: `1px solid ${darkMode ? "#333" : "#eee"}`, marginTop: "1rem" }}>
                    {["/", "/about", "/dashboard", "/login", "/showcase"].map((path, i) => (
                        <Link key={i} to={path} onClick={() => setMenuOpen(false)}
                            style={{ color: linkColor, textDecoration: "none", fontSize: "1rem", fontWeight: "500", padding: "0.3rem 0" }}>
                            {["Home", "About", "Dashboard", "Login", "Components"][i]}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

const styles = {
    iconBtn: { background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", padding: "0.2rem 0.5rem", borderRadius: "8px" },
};