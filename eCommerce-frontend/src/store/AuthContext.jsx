import React, { createContext, useEffect, useState } from "react";
import API from '../API/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.get("/auth", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setUser(null);
                setIsAuthenticated(false);
            });
    }, []);

    async function login(credential) {
        try {
            const res = await API.post('/admin/login', credential, { withCredentials: true });

            if (res.status === 200) {
                setUser(res.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    async function logout() {
        try {
            const response = await API.post('/admin/logout', {}, { withCredentials: true });

            if (response.status === 200) {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
