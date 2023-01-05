import React from 'react'
import './Style.css'
import { Link, useParams } from 'react-router-dom'

const OrderSuccess = () => {  

    const params = useParams(); 

      return (
        <section className='orderSuccess'>
        <div className='container'>
            <div className="orderSuccess-div"> 
                <>
                {
                (parseInt(params.code) === 500) ? (
                   <section>
                        <h1>Ordine fallito!</h1>
                        <div className='regFailed'>
                            <i className="fas fa-times-circle"></i> 
                        </div>

                        <p className='orderSuccess-p'>
                        La registrazione dell'ordine è fallita!<br/>
                        Riprova!<br/>                    
                        <span className='orderSuccess-goDashboard-link'>
                            <Link to='/userDashboard'>
                                <button className='orderSuccess-goDashboard-btn'>Riprova</button>
                            </Link>
                        </span>
                        
                    </p>
                   </section>
                ) : (
                    <>               
                <section>
                    <h1>L'ordine è stato ricevuto!</h1>
                    <div>
                        <i className="fas fa-check-circle"></i> 
                    </div>
                    
                    <p className='orderSuccess-p'>
                        Stiamo processando l'ordine!<br/>
                        Controlla lo stato della spedizione nella tua sezione dedicata!<br/>                    
                        <span className='orderSuccess-goDashboard-link'>
                            <Link to='/login'>
                                <button className='orderSuccess-goDashboard-btn'>Vai alla dashboard</button>
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

export default OrderSuccess