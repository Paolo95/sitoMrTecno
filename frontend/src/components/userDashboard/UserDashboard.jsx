/*
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
*/
import Navpage from "./Navpage";
import UserSideBar from "./UserSideBar";

const UserDashboard = () => {
  
    /*
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const logout = useLogout();
  */

  

  /*

  useEffect(() => {
    //const controller = new AbortController();
    //let isMounted = true;

    const getUsers = async () => {
      
        try {
            const response = await axiosPrivate.get('/api/user/getUser', {
                //signal: controller.signal
            });
            setUsers(response.data);

        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
      }

      getUsers();

      return () => {
        //isMounted = false;
        // controller.abort();
      }    
  })
 */

  return (

    <section className="userDashboard">
        <div className="container" id="userDashboardContainer">
            <div>
                <UserSideBar />
            </div>

            <div>
                <Navpage />
            </div>
        
        </div>
    </section>
  )
}

export default UserDashboard