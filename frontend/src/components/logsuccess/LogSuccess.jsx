import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'

const LogSuccess = () => {    
    
      return (
        <section className='logSuccess'>
        <div className='container'>
            <div className="logSuccess-div">                
                <section>
                    <h1>Registrato con successo!</h1>
                    <div>
                        <i className="fas fa-check-circle"></i> 
                    </div>
                    
                    <p className='logSuccess-p'>
                        Il tuo account è stato creato correttamente!<br/>
                        Effettua il primo ordine!<br/>                    
                        <span className='logSuccess-login-link'>
                            <Link to='/login'>
                                <button className='logSuccess-login-btn'>Login</button>
                            </Link>
                        </span>
                        
                    </p>
                </section>         
            </div>
            
        </div>
        </section>
    
  )
}

export default LogSuccess