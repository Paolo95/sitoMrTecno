import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [MobileMenu , setMobileMenu] = useState(false);

  return (
    <>
      <header className='header'>
        <div className="container f_flex">
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
                <Link to='/track'>traccia ordine</Link>
              </li>
              <li>
                <Link to='/track'>contatti</Link>
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