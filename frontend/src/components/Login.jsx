import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast } from "../components/ui";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const handleLogin = () => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <main style={styles.main}>
                <div style={styles.card}>
                    <h1 style={styles.heading}>Welcome Back</h1>
                    <p style={styles.para}>Sign in to access your product description history and saved listings.</p>
                    <div style={styles.fields}>
                        <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input label="Password" type="password" placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button label="Login - Coming Soon" variant="primary" onClick={handleLogin} />
                </div>
            </main>
            <Toast message="Auth coming soon! Stay tuned." type="info" visible={toastVisible} />
            <Footer />
        </div>
    );
}

const styles = {
    main: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", backgroundColor: "#f5f5f5" },
    card: { backgroundColor: "#fff", borderRadius: "12px", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
    heading: { color: "#e94560", marginBottom: "0.5rem" },
    para: { color: "#666", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: "1.6" },
    fields: { display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" },
};