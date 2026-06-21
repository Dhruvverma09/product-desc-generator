/**
 * Toast Component
 * @param {string} message - Message to display in the toast
 * @param {'success'|'error'|'info'} type - Toast style type
 * @param {boolean} visible - Whether toast is visible
 */
export default function Toast({ message = "Action completed!", type = "success", visible }) {
    if (!visible) return null;
    const colors = {
        success: "#27ae60",
        error: "#e94560",
        info: "#2980b9",
    };
    return (
        <div style={{ ...styles.toast, backgroundColor: colors[type] }}>
            {message}
        </div>
    );
}

const styles = {
    toast: { position: "fixed", bottom: "2rem", right: "2rem", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "8px", fontSize: "0.95rem", fontWeight: "600", boxShadow: "0 4px 15px rgba(0,0,0,0.2)", zIndex: 9999 },
};