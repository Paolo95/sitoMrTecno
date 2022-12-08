import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'

const RegSuccess = () => {    
    
      return (
        <section className='regSuccess'>
        <div className='container'>
            <div className="regSuccess-div">                
                <section>
                    <h1>Registrato con successo!</h1>
                    <div>
                        <i className="fas fa-check-circle"></i> 
                    </div>
                    
                    <p className='regSuccess-p'>
                        Il tuo account è stato creato correttamente!<br/>
                        Effettua il primo ordine!<br/>                    
                        <span className='regSuccess-login-link'>
                            <Link to='/login'>
                                <button className='regSuccess-login-btn'>Login</button>
                            </Link>
                        </span>
                        
                    </p>
                </section>         
            </div>
            
        </div>
        </section>
    
  )
}

export default RegSuccess