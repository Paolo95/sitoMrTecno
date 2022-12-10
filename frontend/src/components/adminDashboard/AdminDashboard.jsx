import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  
  const [ users, setUsers ] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    //const controller = new AbortController();
    //let isMounted = true;

    const getUsers = async () => {
      
        try {
            const response = await axiosPrivate.get('/api/user/getUser', {
                //signal: controller.signal
            });
            console.log(response.data)
            setUsers(response.data);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
      }

      getUsers();

      return () => {
          //isMounted = false;
          //controller.abort();
      }    
  })


  return (
    <div>
      {
        users
      }
    </div>
  )
}

export default AdminDashboard