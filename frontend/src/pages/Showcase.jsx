import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Modal, Toast, Loader } from "../components/ui";

export default function Showcase({ darkMode, toggleTheme }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const bg = darkMode ? "#0f0f1a" : "#f5f5f5";
    const cardBg = darkMode ? "#1a1a2e" : "#fff";
    const textColor = darkMode ? "#f0f0f0" : "#1a1a2e";
    const subColor = darkMode ? "#aaa" : "#666";

    const showToast = () => { setToastVisible(true); setTimeout(() => setToastVisible(false), 3000); };

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: bg }}>
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
            <main style={{ flex: 1, padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
                <h1 style={{ color: "#e94560", marginBottom: "0.5rem" }}>UI Component Library</h1>
                <p style={{ color: subColor, marginBottom: "2.5rem" }}>All reusable components used across HimShakti ListingAI</p>

                {[
                    {
                        title: "Button", content: (
                            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                                <Button label="Primary" variant="primary" onClick={() => { }} />
                                <Button label="Secondary" variant="secondary" onClick={() => { }} />
                                <Button label="Danger" variant="danger" onClick={() => { }} />
                                <Button label="Disabled" disabled />
                            </div>
                        )
                    },
                    {
                        title: "Input", content: (
                            <div style={{ maxWidth: "400px" }}>
                                <Input label="Product Name" placeholder="e.g. Himalayan Honey 500g" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                            </div>
                        )
                    },
                    {
                        title: "Modal", content: (
                            <>
                                <Button label="Open Modal" onClick={() => setModalOpen(true)} />
                                <Modal isOpen={modalOpen} title="Sample Modal" onClose={() => setModalOpen(false)}>
                                    <p style={{ color: "#444" }}>This is a reusable modal component. Click outside or X to close.</p>
                                </Modal>
                            </>
                        )
                    },
                    { title: "Toast", content: <Button label="Show Toast" variant="secondary" onClick={showToast} /> },
                    {
                        title: "Loader", content: (
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <Loader size="sm" /> <Loader size="md" /> <Loader size="lg" />
                            </div>
                        )
                    },
                ].map((section, i) => (
                    <div key={i} style={{ backgroundColor: cardBg, borderRadius: "12px", padding: "2rem", marginBottom: "1.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                        <h2 style={{ color: textColor, marginBottom: "1rem", fontSize: "1.1rem" }}>{section.title}</h2>
                        {section.content}
                    </div>
                ))}
            </main>
            <Toast message="Description copied to clipboard!" type="success" visible={toastVisible} />
            <Footer darkMode={darkMode} />
        </div>
    );
}