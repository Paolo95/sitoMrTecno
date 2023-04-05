import React, { useEffect, useState } from 'react'
import './barterDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Moment from 'react-moment';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';

const BarterDetails = () => {

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
                    
                <div className="progressBar">
                    <div className="progress" id='progress' style={{width: `${((formStepsNum - 1) / (5)) * 100 }%`}}></div>
                    <div className={formStepsNum >= 1 ? "progress-step progress-step-active" : "progress-step"} data-title='In lavorazione'></div>
                    <div className={formStepsNum >= 2 ? "progress-step progress-step-active" : "progress-step"} data-title='Valutazione effettuata'></div>
                    <div className={formStepsNum >= 3 ? "progress-step progress-step-active" : "progress-step"} data-title='Pagamento effettuato'></div>
                    <div className={formStepsNum >= 4 ? "progress-step progress-step-active" : "progress-step"} data-title='Prodotto spedito'></div>
                    <div className={formStepsNum >= 5 ? "progress-step progress-step-active" : "progress-step"} data-title='Permuta ricevuta'></div>
                    <div className={formStepsNum >= 6 ? "progress-step progress-step-active" : "progress-step"} data-title='Rimborso inviato'></div>
                </div>            

            <div className="barterDetails-body">
                <ul>
                    <li>
                        <b>Data permuta: </b>{<Moment format='DD/MM/YYYY'>{barterDetails[0]?.['barter.barter_date']}</Moment> }
                    </li>
                    <li>
                        <b>Totale permuta: </b>{parseFloat(barterDetails[0]?.['barter_total']).toFixed(2)} €
                    </li>
                    <li>
                        <b>Corriere: </b>{barterDetails[0]?.['barter.shipping_carrier']}
                    </li>
                    <li>
                        <b>Codice spedizione: </b>{barterDetails[0]?.['barter.shipping_code']}
                    </li>
                    <li>
                        <b>Indirizzo spedizione: </b>{barterDetails[0]?.['barter.shipping_address']}
                    </li>
                    <li>
                        <b>Telefono per invio info prodotti: </b>{barterDetails[0]?.['barter.barter_telephone']}
                    </li>
                    <li>
                        <b>Prodotti acquisiti: </b>
                        {
                            barterDetails.map((item, index) => {
                                return(
                                    <li>
                                        <span className='product-price'>{item['qty'] + 'x ' +  item['product.product_name'] + ' - ' + item['product.price'].toFixed(2)} €</span>
                                    </li>
                                    
                                )
                            })
                            

                        }
                    </li>

                <li><b>Prodotti permutati:</b></li>
                {
                    barterDetails.length !== 0 ?
                    Object.values(JSON.parse(barterDetails[0]?.['barter.barter_items'])).map((item, index) => {
                        return(
                            <div className='barter-items-li' key={index}>
                                <li>Nome: {item.name}</li>
                                <li>Descrizione: {item.description}</li>
                            </div>
                        )
                    })
                    : null
                }    

                <li><b>Valutazione della permuta: </b>{parseFloat(barterDetails[0]?.['barter.barter_evaluation']).toFixed(2)}€</li>

                <li><b>Spese di spedizione: </b>{parseFloat(barterDetails[0]?.['barter.shipping_cost']).toFixed(2)}€</li>
               
                <li><b>Commissioni PayPal: </b>{parseFloat(barterDetails[0]?.['barter.paypal_fee']).toFixed(2)}€</li>
                
                <li><b>Note: </b>{barterDetails[0]?.['barter.notes']}</li>

                </ul>
                
            </div>
        </div>

        }   
        
    </section>
  )
}

export default BarterDetails