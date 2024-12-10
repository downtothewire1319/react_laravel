import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Appcontext } from '../context/AppContext';

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useContext(Appcontext);

    return isLoggedIn ? <Navigate to="/" /> : element;
};

export default ProtectedRoute;
