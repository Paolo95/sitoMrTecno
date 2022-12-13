import React from 'react'
import './Style.css'
import { Link, useParams } from 'react-router-dom'

const PassRecSuccess = () => {    

    const params = useParams(); 
    
      return (
        <section className='passRecSuccess'>
        <div className='container'>
            <div className="passRecSuccess-div"> 
                <>
                {
                (parseInt(params.code) === 500) ? (
                   <section>
                        <h1>Recuper password fallito!</h1>
                        <div className='recFailed'>
                            <i className="fas fa-times-circle"></i> 
                        </div>

                        <p className='passRecSuccess-p'>
                        La registrazione dell'account è fallita!<br/>
                        Riprova!<br/>                    
                        <span className='passRecSuccess-login-link'>
                            <Link to='/passRecovery'>
                                <button className='passRecSuccess-login-btn'>Riprova</button>
                            </Link>
                        </span>
                        
                    </p>
                   </section>
                ) : (
                    <>            
                <section>
                    <h1>Password modificata con successo!</h1>
                    <div>
                        <i className="fas fa-check-circle"></i> 
                    </div>
                    
                    <p className='passRecSuccess-p'>
                        La tua password è stata modificata con una provvisoria!<br/>
                        Puoi modificarla nella sezione dedicata al tuo account!<br/>                    
                        <span className='passRecSuccess-login-link'>
                            <Link to='/userDashboard'>
                                <button className='passRecSuccess-login-btn'>Torna all'account</button>
                            </Link>
                        </span>                        
                    </p>
                </section>  
                </>)}
                </>       
            </div>
            
        </div>
        </section>
    
  )
}

export default PassRecSuccess