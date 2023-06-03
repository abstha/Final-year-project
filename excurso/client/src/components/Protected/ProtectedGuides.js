import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const GProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    return (
        token ? <Outlet /> : <Navigate to="/guides/login" />
    )
};

export default GProtectedRoutes