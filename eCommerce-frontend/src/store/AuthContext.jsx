import React, { createContext, useEffect, useState } from "react";
import API from '../API/api'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('session') === 'true'
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        API.get("/auth")
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);


    async function login(credential) {
        const res = await API.post('/admin/login', credential, { withCredentials: true })
        if (res.status === 200) {
            setIsAuthenticated(true);
            localStorage.setItem('session', 'true')
        }
    }

    async function logout() {
        try {
            const response = await API.post('/admin/logout', {}, { withCredentials: true })

            if (response.status === 200) {
                setIsAuthenticated(false);
                localStorage.removeItem('session'); // Clear the session from localStorage
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login, user }}>
            {children}
        </AuthContext.Provider>
    );
};
