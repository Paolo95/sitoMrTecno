import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useAuth();
    const location = useLocation();
   
    const decoded = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const role = decoded?.UserInfo.role || undefined

    return(
        role === allowedRole
            ? <Outlet />
            : auth?.user
                ? <Navigate to='/unauthorized' state ={{ from: location }} replace/>
                : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;