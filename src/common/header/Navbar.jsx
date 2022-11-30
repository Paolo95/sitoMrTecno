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
                <Link to='/permuta'>permuta</Link>
              </li>
              <li>
                <Link to='/ricondizionati'>ricondizionati</Link>
              </li>              
              <li>
                <Link to='/nuovo'>nuovo</Link>
              </li>
              <li>
                <Link to='/riparazioni'>riparazioni</Link>
              </li>
              <li>
                <Link to='/inostriprodotti'>i nostri prodotti</Link>
              </li>
              <li>
                <Link to='/assistenza'>assistenza remota</Link>
              </li>
              <li>
                <Link to='/recupero'>recupero dati</Link>
              </li>
              <li>
                <Link to='/servizi'>servizi</Link>
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