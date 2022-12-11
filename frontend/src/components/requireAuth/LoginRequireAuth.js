import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

const LoginRequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined
  
    const role = decoded?.role || undefined


    return(
        role === 'admin'
            ? <Navigate to='/adminDashboard' state ={{ from: location }} replace />
            : role === 'customer'
                ? <Navigate to='/userDashboard' state ={{ from: location }} replace />
                : <Outlet />
    );
}

export default LoginRequireAuth;