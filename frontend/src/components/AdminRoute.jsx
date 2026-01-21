import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, isSignedIn } = useAuth();

    if (!isSignedIn) {
        return <Navigate to="/" replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
