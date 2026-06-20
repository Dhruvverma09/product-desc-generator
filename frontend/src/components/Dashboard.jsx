import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={styles.main}>
                <h1 style={styles.heading}>Dashboard</h1>
                <p style={styles.para}>Your generated product descriptions will appear here. Track your listings, manage tone preferences, and copy output directly to your e-commerce store.</p>
            </main>
            <Footer />
        </div>
    );
}

const styles = {
    main: { flex: 1, padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", width: "100%" },
    heading: { color: "#e94560", marginBottom: "1rem" },
    para: { color: "#444", lineHeight: "1.8", fontSize: "1.05rem" },
};