/**
 * Input Component
 * @param {string} label - Label text above the input
 * @param {string} placeholder - Placeholder text inside input
 * @param {'text'|'email'|'password'|'number'} type - Input type
 * @param {string} value - Controlled value
 * @param {function} onChange - Change handler function
 */
export default function Input({ label, placeholder = "Enter value...", type = "text", value, onChange }) {
    return (
        <div style={styles.wrapper}>
            {label && <label style={styles.label}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    wrapper: { display: "flex", flexDirection: "column", gap: "0.4rem" },
    label: { fontSize: "0.9rem", fontWeight: "600", color: "#333" },
    input: { padding: "0.7rem 1rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.95rem", outline: "none", width: "100%" },
};