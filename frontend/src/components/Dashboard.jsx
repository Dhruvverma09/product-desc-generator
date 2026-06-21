import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Toast, Loader } from "../components/ui";

const stats = [
    { label: "Descriptions Generated", value: "0" },
    { label: "Products Added", value: "0" },
    { label: "Tones Used", value: "0" },
];

export default function Dashboard() {
    const [toastVisible, setToastVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
        }, 1500);
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={styles.main}>
                <div style={styles.topRow}>
                    <h1 style={styles.heading}>Dashboard</h1>
                    <Button label="Refresh Stats" variant="secondary" onClick={handleRefresh} />
                </div>
                <p style={styles.para}>Your generated product descriptions will appear here. Track your listings, manage tone preferences, and copy output directly to your e-commerce store.</p>

                {loading ? <Loader size="md" /> : (
                    <div style={styles.grid}>
                        {stats.map((s, i) => (
                            <div key={i} style={styles.card}>
                                <h2 style={styles.value}>{s.value}</h2>
                                <p style={styles.label}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Toast message="Stats refreshed successfully!" type="success" visible={toastVisible} />
            <Footer />
        </div>
    );
}

const styles = {
    main: { flex: 1, padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" },
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "1rem" },
    heading: { color: "#e94560" },
    para: { color: "#444", lineHeight: "1.8", fontSize: "1.05rem", marginBottom: "2rem" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" },
    card: { backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.08)" },
    value: { fontSize: "2.5rem", color: "#e94560", margin: 0 },
    label: { color: "#666", marginTop: "0.5rem", fontSize: "0.95rem" },
};