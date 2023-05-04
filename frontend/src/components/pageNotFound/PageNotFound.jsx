import React, { useEffect } from 'react'
import './pageNotFound.css'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

const PageNotFound = () => {  

    const logout = useLogout();

    useEffect(() => {
        const signOut = async () => {
            await logout();
        }
        
        signOut();
    })

      return (
        <section className='pageNotFound'>
        <div className='container'>
            <div className="pageNotFound-div"> 
                <h1>Ops... Pagina non trovata</h1>
                    <div>
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    
                    <p className='pageNotFound-p'>
                        La pagina richiesta non è disponibile!<br/>
                        <br/>                    
                        <span className='pageNotFound-menu-link'>
                            <Link to='/'>
                                <button className='pageNotFound-menu-btn'>Torna alla homepage</button>
                            </Link>
                        </span>
                        
                    </p>
                    
            </div>
            
        </div>
    </section>
    
  )
}

export default PageNotFound