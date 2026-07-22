import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0f0f1a", color: "#fff", padding: "2rem", textAlign: "center" }}>
                    <h1 style={{ color: "#e94560", marginBottom: "0.5rem" }}>Something went wrong</h1>
                    <p style={{ color: "#999", marginBottom: "1.5rem" }}>Please refresh the page or try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ padding: "0.7rem 1.6rem", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "7px", fontWeight: "700", cursor: "pointer" }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}