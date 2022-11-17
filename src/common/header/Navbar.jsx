import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

  const [MobileMenu , setMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className='header'> 
      
        <div className="container d_flex"> 
        { location.pathname === '/shop' ? 
          <>      
          <div className= 'categories d_flex'>
            <span className="fas fa-bars"></span>
            <h4>Categorie <i className='fa fa-chevron-down'></i></h4>          
          </div>
          </>: <div className= 'd_flex'>          
          </div>
        }
               
          <div className="navlink">
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to='/'>home</Link>
              </li>
              <li>
                <Link to='/shop'>shop</Link>
              </li>
              <li>
                <Link to='/user'>account</Link>
              </li>
              <li>
                <Link to='/trackOrder'>traccia ordine</Link>
              </li>
              <li>
                <Link to='/contact'>contatti</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-bth'></i> :
                <i className='fas fa-bars open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar