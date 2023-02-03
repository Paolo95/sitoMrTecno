import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import ClipLoader from 'react-spinners/ClipLoader'

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {isLoading
                ? <div style={{display: 'flex', justifyContent: 'center', margin: '50px'}} className="loader">
                        <ClipLoader
                            color={'#0f3460'}
                            loading={isLoading}
                            size={60}
                        />
                     </div>
                : <Outlet />
            }
        </>
    )
}

export default PersistLogin