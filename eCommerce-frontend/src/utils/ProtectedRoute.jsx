import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const authCtx = useContext(AuthContext);
    return authCtx.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};