import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import useLogout from "../../hooks/useLogout";
import "./adminSideBarStyle.css"
import useAuth from '../../hooks/useAuth';
import jwt_decode from 'jwt-decode';

const AdminSideBar = () => {

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
                    <div className="adminDashboardLogo">
                        <h2>{`Bentornato ${username.UserInfo.username}!`}</h2>
                    </div>
                    <div className="close" id="close-btn">
                        <i className="fas fa-times"></i>
                    </div>
                </div>

                <div className="adminSidebar">
                    <NavLink to={'/adminDashboard/home'}>
                                            
                        <i className="fas fa-receipt"></i>                        
                        <h3>Dashboard</h3>                       
                    </NavLink>
                    
                    <NavLink to={'/adminDashboard/products'}>
                              
                        <i className="fas fa-shopping-bag"></i>
                        <h3>Prodotti</h3>
                    </NavLink>

                    <NavLink to={'/adminDashboard/newProduct'}>
                              
                        <i className="fas fa-cart-plus"></i>
                        <h3>Aggiungi prodotti</h3>
                    </NavLink>

                    <NavLink to={'/adminDashboard/orders'}>
                              
                        <i className="fas fa-tags"></i>
                        <h3>Ordini</h3>
                    </NavLink>

                    <NavLink to={'/adminDashboard/barters'}>
                              
                        <i className="fas fa-handshake"></i>
                        <h3>Permute</h3>
                    </NavLink>

                    <NavLink to={'/adminDashboard/faqs'}>
                              
                        <i className="fas fa-question-circle"></i>
                        <h3>Faq</h3>
                    </NavLink>

                    <a href="/" onClick={() => signOut()}>
                        <i className="fas fa-sign-out-alt" ></i>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>

  )
}

export default AdminSideBar