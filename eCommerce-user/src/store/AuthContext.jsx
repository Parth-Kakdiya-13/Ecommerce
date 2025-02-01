import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function sessionHandler() {
            try {
                const response = await axios.get("https://ecommerce-o1ub.vercel.app/admin/session", {
                    withCredentials: true, // Ensure cookies are sent
                });

                console.log(response.data); // Log response for debugging

                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setIsAuthenticated(false);
            }
        }

        sessionHandler();
    }, []); // Dependency array to prevent infinite calls

    async function logout() {

        try {
            const response = await axios.post(
                "https://ecommerce-o1ub.vercel.app/admin/logout",
                {},
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
