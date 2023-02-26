import { useState, useEffect} from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {

  const [ users, setUsers ] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users', {
                signal: controller.signal
            });
            isMounted && setUsers(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }    
  }, [])

  return (
    <article>
        <h2>Users list</h2>
        { users?.lenght
            ? (
                <ul>
                    {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                </ul>
            ) : <p>No users to display</p>
        }
    </article>
  )
}

export default Users