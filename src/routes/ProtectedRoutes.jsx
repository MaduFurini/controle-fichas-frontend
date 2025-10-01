import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import {Events} from "../pages/mainPage/Events.jsx";
import {Communities} from "../pages/management/Communities.jsx";

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

            {/* Rota da aba de Página Inicial */}
            <Route path="/festividades" element={<Events />}/>
            <Route path="/equipamentos" element={<Events />}/>
            <Route path="/produtos" element={<Events />}/>
            <Route path="/categorias" element={<Events />}/>
            <Route path="/relatorios" element={<Events />}/>
            <Route path="/comunidades" element={<Communities />}/>
            <Route path="/usuarios" element={<Events />}/>
        </Routes>
    );
};

export default ProtectedRoutes;