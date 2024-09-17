import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Możesz dodać spinner lub inny komponent ładowania
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    return <Outlet />;
};

export { ProtectedRoute };