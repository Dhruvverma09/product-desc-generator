/**
 * Loader Component
 * @param {string} size - Size of the loader ('sm'|'md'|'lg')
 * @param {string} color - Color of the spinner
 */
export default function Loader({ size = "md", color = "#e94560" }) {
    const sizes = { sm: "24px", md: "40px", lg: "60px" };
    const dim = sizes[size] || sizes.md;
    return (
        <div style={styles.wrapper}>
            <div style={{ ...styles.spinner, width: dim, height: dim, borderTopColor: color }} />
        </div>
    );
}

const styles = {
    wrapper: { display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem" },
    spinner: { border: "4px solid #f0f0f0", borderTopWidth: "4px", borderTopStyle: "solid", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
};

// Inject keyframe animation
const styleTag = document.createElement("style");
styleTag.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(styleTag);