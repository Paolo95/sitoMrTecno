import React, { useEffect } from 'react'
import './Style.css'
import { Link, useParams } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'

const RegSuccess = () => {  

    const logout = useLogout();

    useEffect(() => {
        const signOut = async () => {
            await logout();
        }
        
        signOut();
    })

    const params = useParams(); 

      return (
        <section className='regSuccess'>
        <div className='container'>
            <div className="regSuccess-div"> 
                <>
                {
                (parseInt(params.code) === 500) ? (
                   <section>
                        <h1>Registrazione fallita!</h1>
                        <div className='regFailed'>
                            <i className="fas fa-times-circle"></i> 
                        </div>

                        <p className='regSuccess-p'>
                        La registrazione dell'account è fallita!<br/>
                        Riprova!<br/>                    
                        <span className='regSuccess-login-link'>
                            <Link to='/register'>
                                <button className='regSuccess-login-btn'>Riprova</button>
                            </Link>
                        </span>
                        
                    </p>
                   </section>
                ) : (
                    <>               
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
                    </>)}
                  
                </>       
            </div>
            
        </div>
        </section>
    
  )
}

export default RegSuccess