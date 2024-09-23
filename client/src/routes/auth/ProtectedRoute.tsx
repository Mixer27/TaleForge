import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { username } = useAuth();

    if (!username) {
        { console.log(username)}
        return <Navigate to="/auth" />;
    } else {
        { console.log(username) }
        return <Outlet />;
    }

    // if (loading) {
    //     return <div>{ isLoggedIn ? "ISLOGGEDIN" : "NOPE"} Loading...</div>; // Możesz dodać spinner lub inny komponent ładowania
    // }

    

    // return <Outlet />;
};

export { ProtectedRoute };