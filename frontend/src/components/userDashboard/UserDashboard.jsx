import Navpage from "./Navpage";
import UserSideBar from "./UserSideBar";

const UserDashboard = () => {
  
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