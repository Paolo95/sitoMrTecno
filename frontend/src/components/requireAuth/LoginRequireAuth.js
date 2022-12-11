import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginRequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    
    return(
        auth?.role === 'admin'
            ? <Navigate to='/adminDashboard' state ={{ from: location }} replace />
            : auth?.role === 'customer'
                ? <Navigate to='/userDashboard' state ={{ from: location }} replace />
                : <Outlet />
    );
}

export default LoginRequireAuth;