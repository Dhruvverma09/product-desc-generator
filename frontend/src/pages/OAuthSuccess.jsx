import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const name = params.get("name");
        const email = params.get("email");
        const id = params.get("id");

        if (token) {
            loginWithToken(token, { id, name, email });
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontSize: "1.2rem", color: "#e94560" }}>Logging you in... ⏳</p>
        </div>
    );
}