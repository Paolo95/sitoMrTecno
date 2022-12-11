import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
       
        const response = await axios.get('/api/user/refresh', {
            withCredentials: true
        });
        console.log(response.data)
        setAuth(prev => {
            return {
                ...prev,
                user: response.data.username,
                role: response.data.role,
                accessToken: response.data.accessToken 
            }
        });

        return response.data.accessToken;
    }

  return refresh;
}

export default useRefreshToken;