import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import {AppLayout} from "../layouts/AppLayout.jsx";

const AppRoutes = ({ userToken }) => {
    return (
        <>
            {userToken ? (
                <AppLayout>
                    <ProtectedRoutes />
                </AppLayout>
            ) : (
                // <AuthRoutes />
                <AppLayout>
                    <ProtectedRoutes />
                </AppLayout>
            )}
        </>
    );
};

export default AppRoutes;