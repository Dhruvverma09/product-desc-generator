/**
 * Button Component
 * @param {string} label - Text to display on the button
 * @param {'primary'|'secondary'|'danger'} variant - Button style variant
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Whether button is disabled
 */
export default function Button({ label = "Click Me", variant = "primary", onClick, disabled = false }) {
    const variants = {
        primary: { backgroundColor: "#e94560", color: "#fff" },
        secondary: { backgroundColor: "#1a1a2e", color: "#fff" },
        danger: { backgroundColor: "#c0392b", color: "#fff" },
    };
    return (
        <button onClick={onClick} disabled={disabled} style={{ ...styles.btn, ...variants[variant], opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
            {label}
        </button>
    );
}

const styles = {
    btn: { padding: "0.7rem 1.5rem", border: "none", borderRadius: "8px", fontSize: "0.95rem", fontWeight: "600", transition: "opacity 0.2s" },
};
// v1.1 - added aria-label support
