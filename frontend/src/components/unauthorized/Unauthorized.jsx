import React from 'react'
import './Style.css'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {   
    
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    
      return (
        <section className='unauthorized'>
        <div className='container'>
            <div className="unauthorized-div">                
                <section>
                    <h1>Accesso negato!</h1>
                    <div>
                        <i className="fas fa-times-circle"></i> 
                    </div>
                    
                    <p className='unauthorized-p'>
                        Non hai l'autorizzazione per accedere a questa pagina!<br/>                   
                        <span className='unauthorized-login-link'>                            
                            <button className='unauthorized-login-btn' onClick={goBack}>Torna indietro</button>                            
                        </span>
                        
                    </p>
                </section>         
            </div>
            
        </div>
        </section>
    
  )
}

export default Unauthorized