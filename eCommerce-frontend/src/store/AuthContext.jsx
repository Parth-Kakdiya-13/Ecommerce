import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('session') === 'true'
    );


    function login() {
        setIsAuthenticated(true);
        localStorage.setItem('session', 'true')
    }

    async function logout() {
        try {
            const response = await axios.post(
                "https://ecommerce-ashy-seven.vercel.app/admin/logout",
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsAuthenticated(false);
                localStorage.removeItem('session'); // Clear the session from localStorage
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
