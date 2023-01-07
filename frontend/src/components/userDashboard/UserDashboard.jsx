import Navpage from "./Navpage";
import UserSideBar from "./UserSideBar";

const UserDashboard = () => {
  
  return (

    <section className="userDashboard">
        <div className="container" id="userDashboardContainer">
            
          <UserSideBar />          
          <Navpage />            
        
        </div>
    </section>
  )
}

export default UserDashboard