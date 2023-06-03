import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const token = localStorage.getItem('usertoken');
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
};

export default ProtectedRoutes