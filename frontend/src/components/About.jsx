import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={styles.main}>
                <h1 style={styles.heading}>About HimShakti ListingAI</h1>
                <p style={styles.para}>HimShakti ListingAI is an AI-powered tool designed to help small food processing businesses in Himachal Pradesh create compelling product listings for e-commerce platforms like Amazon and Flipkart. Built as part of the TBI-GEU Summer Internship Program 2026.</p>
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