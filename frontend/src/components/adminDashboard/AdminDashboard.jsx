import Navpage from "./Navpage";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = () => {
  
  return (

    <section className="adminDashboard">
        <div className="container" id="adminDashboardContainer">
            
          <AdminSideBar />          
          <Navpage />            
        
        </div>
    </section>
  )
}

export default AdminDashboard