/**
 * Modal Component
 * @param {boolean} isOpen - Whether modal is visible
 * @param {string} title - Modal heading text
 * @param {React.ReactNode} children - Modal body content
 * @param {function} onClose - Function to close the modal
 */
export default function Modal({ isOpen, title = "Modal Title", children, onClose }) {
    if (!isOpen) return null;
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>{title}</h2>
                    <button onClick={onClose} style={styles.close}>✕</button>
                </div>
                <div style={styles.body}>{children}</div>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modal: { backgroundColor: "#fff", borderRadius: "12px", padding: "2rem", width: "90%", maxWidth: "480px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
    title: { color: "#1a1a2e", fontSize: "1.2rem" },
    close: { background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#666" },
    body: { color: "#444", lineHeight: "1.7" },
};