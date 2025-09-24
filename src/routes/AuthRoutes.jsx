import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/Login.jsx';

const AuthRoutes = () => {
    const { isAuthenticated } = useAuth();

    // Se já está autenticado, redireciona para dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Routes>
            <Route path="/" element={<Login />}/>
        </Routes>
    );
};

export default AuthRoutes;