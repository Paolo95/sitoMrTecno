import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {

    const { setAuth } = useAuth();
    const LOGOUT_URL = '/api/user/logout';

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.get(LOGOUT_URL, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout