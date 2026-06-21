export default function Footer({ darkMode }) {
    return (
        <footer style={{
            backgroundColor: darkMode ? "#0a0a1a" : "#f0f0f0",
            color: darkMode ? "#aaa" : "#555",
            textAlign: "center",
            padding: "1.5rem",
            marginTop: "auto",
            fontSize: "0.9rem",
            borderTop: darkMode ? "none" : "1px solid #ddd",
            transition: "all 0.3s"
        }}>
            <p>© 2025 HimShakti ListingAI — Built for TBI-GEU Summer Internship Program 2026</p>
        </footer>
    );
}