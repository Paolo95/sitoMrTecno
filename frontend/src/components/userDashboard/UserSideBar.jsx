import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import "./userSideBarStyle.css"
import useAuth from '../../hooks/useAuth';
import jwt_decode from 'jwt-decode';

const UserSideBar = () => {

    const { auth } = useAuth();
    const username = jwt_decode(auth?.accessToken);
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

  return (

    
            <aside>
                <div className="top">
                    <div className="userDashboardLogo">
                        <h2>{`Bentornato ${username.UserInfo.username}!`}</h2>
                    </div>
                    <div className="close" id="close-btn">
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="userSidebar">
                    <NavLink to={'/userDashboard/home'}>
                                            
                        <i className="fas fa-receipt"></i>                        
                        <h3>Ordini</h3>                       
                    </NavLink>

                    <NavLink to={'/userDashboard/barters'}>
                                            
                    <i className="fas fa-handshake"></i>                    
                        <h3>Permute</h3>                       
                    </NavLink>

                    <NavLink to={'/userDashboard/reviews'}>
                                            
                    <i className="fas fa-file-signature"></i>                    
                        <h3>Recensioni</h3>                       
                    </NavLink>
                    
                    <NavLink to={'/userDashboard/settings'}>
                              
                        <i className="fas fa-cog"></i>
                        <h3>Impostazioni</h3>
                    </NavLink>
                    <a href="/" onClick={() => signOut()}>
                        <i className="fas fa-sign-out-alt" ></i>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

  )
}

export default UserSideBar