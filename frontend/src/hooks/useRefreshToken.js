import axios from '../api/axios'
import useAuth from './useAuth'
import jwt_decode from 'jwt-decode'

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {

        const response = await axios.get('/api/user/refresh', {
            withCredentials: true
        });

        let role = undefined;
        let username = undefined;

        if (response.data.accessToken !== '') {
            const decoded = jwt_decode(response.data.accessToken);

            role = decoded.UserInfo.role;
            username = decoded.UserInfo.username
        }

        setAuth(prev => {
            return {
                ...prev,
                user: username,
                role: role,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;