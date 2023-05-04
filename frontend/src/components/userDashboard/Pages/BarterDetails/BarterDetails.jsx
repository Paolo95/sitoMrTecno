import React, { useEffect, useState } from 'react'
import './barterDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Moment from 'react-moment';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import Cookies from 'universal-cookie';

const BarterDetails = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const params = useParams();
    const goBack = () => navigate(-1);
    const BARTER_DETAILS_URL = `/api/barter/barterDetails/${params.barterId}`;
    const [loading, setLoading] = useState(false);   
    const [formStepsNum, setFormStepsNum] = useState(1);
    const [barterDetails, setBarterDetails] = useState([]);

    useEffect(() => {

        const getBarters = async () => {
    
          setLoading(true);
    
          try {
           
            const response = await axios.post(BARTER_DETAILS_URL, 
              { 
      
              },
              {
                  headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                  },
                  withCredentials: true
              }
            );  
    
            setLoading(false);

            if (response.data[0]['barter.status'] === 'In lavorazione'){
                setFormStepsNum(1);
            } else if (response.data[0]['barter.status'] === 'Valutazione effettuata'){
                setFormStepsNum(2);
            } else if (response.data[0]['barter.status'] === 'Pagamento effettuato'){
                setFormStepsNum(3);
            } else if (response.data[0]['barter.status'] === 'Prodotto spedito'){
                setFormStepsNum(4);
            } else if (response.data[0]['barter.status'] === 'Permuta ricevuta'){
                setFormStepsNum(5);
            } else if (response.data[0]['barter.status'] === 'Rimborso inviato'){
                setFormStepsNum(6);
            }   

            setBarterDetails(response.data);
      
          } catch (err) {
            if (!err?.response) 
              alert('Server non attivo!');
            else if (err.response.status === 500 ){
              alert(err.response?.data);
            }
            else if (err.response.status === 404 ){
              alert(err.response?.data);
            }else {
              alert('Recupero permuta fallito!');
            }
      
          }    
          
        }
        
        getBarters();
    
        // eslint-disable-next-line
      }, []);

    const handleConfirm = () => {
        const now = new Date();
        cookies.set('barterCode', params.barterId , {
            path: '/',
            expires: new Date(now.getFullYear(), now.getMonth(), now.getDate()+7)
        })
        navigate('/permuta');
    }

  return (
    <section className='barterDetailsPage'>
        <div className="barterDetails-heading">
            <button className='goBack' onClick={goBack}>Torna indietro</button>
        </div>
        {
            loading ? 
            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                <ClipLoader
                color={'#0f3460'}
                loading={loading}
                size={50}
                />
            </div>
            :
            <div className='barterDetails-card'>      
                <div className="barterDetails-heading">
                    <h1 className="heading">{`Permuta n. ${params.barterId}`}</h1>
                </div>      

                {
                    barterDetails[0]?.['barter.status'] === 'Rifiutata' ? 
                        <div className='barterRefusedDiv'>Permuta rifiutata!</div> :
                        barterDetails[0]?.['barter.status'] === 'Annullata' ?
                            <div className='barterRefusedDiv'>Permuta annullata!</div> :
                        <div className="progressBar">
                            <div className="progress" id='progress' style={{width: `${((formStepsNum - 1) / (5)) * 100 }%`}}></div>
                            <div className={formStepsNum >= 1 ? "progress-step progress-step-active" : "progress-step"} data-title='In lavorazione'></div>
                            <div className={formStepsNum >= 2 ? "progress-step progress-step-active" : "progress-step"} data-title='Valutazione effettuata'></div>
                            <div className={formStepsNum >= 3 ? "progress-step progress-step-active" : "progress-step"} data-title='Pagamento effettuato'></div>
                            <div className={formStepsNum >= 4 ? "progress-step progress-step-active" : "progress-step"} data-title='Prodotto spedito'></div>
                            <div className={formStepsNum >= 5 ? "progress-step progress-step-active" : "progress-step"} data-title='Permuta ricevuta'></div>
                            <div className={formStepsNum >= 6 ? "progress-step progress-step-active" : "progress-step"} data-title='Rimborso inviato'></div>
                        </div> 
                }                    

            <div className="barterDetails-body">

                {
                    barterDetails[0]?.['barter.status'] === 'Valutazione effettuata' ? 
                        <div className='barterDetails-box top'>
                            <div className='btnDiv'>
                                <button onClick={handleConfirm}>Conferma la permuta e paga</button>
                            </div>
                                
                        </div> : 
                            null
                }
                

                <div className='barterDetails-box top'>
                    <ul>
                        <li>
                            <div>
                                <b>Data permuta: </b>{<Moment format='DD/MM/YYYY'>{barterDetails[0]?.['barter.barter_date']}</Moment> }
                            </div>
                        </li>

                        
                        
                        <li>
            
                                {
                                    barterDetails.length !== 0 ?
                                    Object.values(JSON.parse(barterDetails[0]?.['barter.barter_items'])).map((item, index) => {
                                        return(
                                            <>
                                            <div className='barter-flexColumn'>
                                                 
                                                <b>Prodotti permutati:</b>
                                                <div className='barter-items-li' key={index}>
                                                    <li><b>Nome:</b></li>
                                                    <span>{item.name}</span>
                                                    <li><b>Descrizione:</b></li>
                                                    <span>{item.description}</span>
                                                </div>
                                            </div>
                                            
                                            </>
                                        )
                                    })
                                    : null
                                }  

                            
                                {
                                    barterDetails.map((item, index) => {
                                        return(
                                            <div className='barter-flexColumn'>
                                                <b>Prodotti acquisiti: </b>
                                                <li>
                                                    <div>
                                                        
                                                        <span className='product-item'>{item['qty']}x {item['product.product_name']} <br /> </span>
                                                        <div>{item['priceEach'].toFixed(2)} €</div>   
                                                    </div>
                                                </li>
                                            </div>
                                            
                                        )
                                    })
                                    

                                }
                        </li>

                        <li>
                            <div>
                                <b>Spese di spedizione: </b>
                                {parseFloat(barterDetails[0]?.['barter.shipping_cost']).toFixed(2)} €
                            </div>
                        </li>
               
                        <li>
                            <div>
                                <b>Commissioni PayPal: </b>
                                {parseFloat(barterDetails[0]?.['barter.paypal_fee']).toFixed(2)} €
                            </div>
                        </li>

                        <li>
                            <div>
                                <b>Totale permuta: </b>
                                <b>{parseFloat(barterDetails[0]?.['barter_total']).toFixed(2)} € </b>
                            </div> 
                        </li>

                        <li>
                            <div>
                                <b>Valutazione della permuta: </b>
                                <b>{parseFloat(barterDetails[0]?.['barter.barter_evaluation']).toFixed(2)} € </b>
                            </div>
                        </li>

                    </ul>
                </div>
                <div className='barterDetails-box top'>
                    <ul>
                        <li>
                            <div>
                                <b>Metodo di pagamento: </b>
                                {barterDetails[0]?.['barter.payment_method']}
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='barterDetails-box top'>
                    <ul>
                        <li>
                            <div>
                                <b>Metodo di consegna: </b>
                                {barterDetails[0]?.['barter.shipping_type']}
                            </div>
                        </li>
                        
                        <li>
                            <div>
                                <b>Corriere: </b>
                                {barterDetails[0]?.['barter.shipping_carrier']}
                            </div>
                        </li>
                        <li>
                            <div>
                                <b>Codice spedizione: </b>
                                {barterDetails[0]?.['barter.shipping_code']}
                            </div>
                        </li>
                        <li>
                            <div>
                                <b>Indirizzo spedizione: </b>
                                {barterDetails[0]?.['barter.shipping_address']}
                            </div>
                        </li>
                        <li>
                            <div>
                                <b>Telefono per invio info prodotti: </b>
                                {barterDetails[0]?.['barter.barter_telephone']}
                            </div>
                        </li>

                    </ul>
                </div>
                
                <div className='barterDetails-box top'>
                    <ul>
                    
                        <li>
                            <div>
                                <b>Note: </b>
                                {barterDetails[0]?.['barter.notes']}
                            </div>
                        </li>

                    </ul>
                </div>
                
                
            </div>
        </div>

        }   
        
    </section>
  )
}

export default BarterDetails