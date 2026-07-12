import { createContext, useContext, useState, useEffect } from "react";
import API_BASE from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            const savedUser = localStorage.getItem("user");
            if (savedUser) setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        const loginWithToken = (token, userData) => {
            setToken(token);
            setUser(userData);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
        };
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.data.token);
                setUser(data.data.user);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch {
            return { success: false, message: "Server error. Try again." };
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setToken(data.data.token);
                setUser(data.data.user);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch {
            return { success: false, message: "Server error. Try again." };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    const loginWithToken = (token, userData) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, loginWithToken }}>        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);