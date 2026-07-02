import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ darkMode, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const bg = darkMode ? "#0a0a1a" : "#ffffff";
    const linkColor = darkMode ? "#e2e2e2" : "#444";
    const activeColor = "#e94560";

    const links = [
        { to: "/",          label: "Home" },
        { to: "/about",     label: "About" },
        { to: "/generate",  label: "✨ Generate" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/login",     label: "Login" },
        { to: "/showcase",  label: "Components" },
    ];

    return (
        <nav style={{ backgroundColor: bg, boxShadow: darkMode ? "0 1px 10px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)", padding: "0.9rem 2rem", position: "sticky", top: 0, zIndex: 100, transition: "all 0.3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>

                {/* Logo */}
                <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: "32px", height: "32px", backgroundColor: "#e94560", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "1rem" }}>H</div>
                    <span style={{ fontSize: "1.2rem", fontWeight: "700", color: "#e94560" }}>HimShakti <span style={{ color: darkMode ? "#fff" : "#1a1a2e" }}>ListingAI</span></span>
                </Link>

                {/* Desktop links */}
                <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }} className="desktop-nav">
                    {links.map((l) => (
                        <Link key={l.to} to={l.to} style={{
                            color: location.pathname === l.to ? activeColor : linkColor,
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            fontWeight: location.pathname === l.to ? "600" : "500",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "6px",
                            backgroundColor: location.pathname === l.to
                                ? (darkMode ? "rgba(233,69,96,0.1)" : "rgba(233,69,96,0.08)")
                                : "transparent",
                            transition: "all 0.2s",
                        }}>
                            {l.label}
                        </Link>
                    ))}
                    <button onClick={toggleTheme} style={{ background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", border: "none", borderRadius: "8px", padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: "1.1rem", marginLeft: "0.5rem" }}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                </div>

                {/* Mobile */}
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }} className="mobile-nav">
                    <button onClick={toggleTheme} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>{darkMode ? "☀️" : "🌙"}</button>
                    <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: darkMode ? "#fff" : "#1a1a2e" }}>{menuOpen ? "✕" : "☰"}</button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{ maxWidth: "1200px", margin: "0.8rem auto 0", borderTop: `1px solid ${darkMode ? "#222" : "#eee"}`, paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    {links.map((l) => (
                        <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)} style={{ color: location.pathname === l.to ? activeColor : linkColor, textDecoration: "none", fontSize: "1rem", fontWeight: "500", padding: "0.6rem 0.5rem", borderRadius: "6px" }}>
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
