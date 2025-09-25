import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Dashboard from "../pages/dashboard/Dashboard.jsx";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();

    // Loading state
    // if (loading) {
    //     return <Loading />;
    // }

    // if (!isAuthenticated) {
    //     return <Navigate to="/auth/login" replace />;
    // }

    return (
        <Routes>
            {/* Rota padrão - redireciona para dashboard */}
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    );
};

export default ProtectedRoutes;