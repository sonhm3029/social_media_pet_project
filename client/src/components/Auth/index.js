import React, {
    useContext,

} from 'react';

import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '@src/Context';
import { toast } from 'react-toastify';

const ProtectedRoute = ({isAuth}) => {
    // const {auth: {isAuth}} = useContext(Context);
    console.log("isAuth", isAuth);
    return (
        isAuth?(<Outlet/>):(<Navigate to="/login"/>)
    )
}

export default ProtectedRoute;