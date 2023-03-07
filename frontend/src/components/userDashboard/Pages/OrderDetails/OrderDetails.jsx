import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import Moment from 'react-moment';
import './orderDetailsStyle.css';
import ClipLoader from 'react-spinners/ClipLoader';

const OrderDetails = () => {

  const params = useParams();
  const { auth } = useAuth();
  const ORDER_DETAILS_URL = `/api/order/orderDetails/${params.orderId}`; 
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const [formStepsNum, setFormStepsNum] = useState(1);

  useEffect(() => {

    const getOrders = async () => {

      setLoading(true);

      try {
       
        const response = await axios.post(ORDER_DETAILS_URL, 
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

        if (response.data[0]['order.order_status'] === 'In lavorazione'){
            setFormStepsNum(1);
        } else if (response.data[0]['order.order_status'] === 'In spedizione'){
            setFormStepsNum(2);
        } else if (response.data[0]['order.order_status'] === 'Concluso'){
            setFormStepsNum(3);
        }             
        setOrderDetails(response.data);
  
      } catch (err) {
        if (!err?.response) 
          alert('Server non attivo!');
        else if (err.response.status === 500 ){
          alert(err.response?.data);
        }
        else if (err.response.status === 404 ){
          alert(err.response?.data);
        }else {
          alert('Recupero ordine fallito!');
        }
  
      }    
      
    }
    
    getOrders();

    // eslint-disable-next-line
  }, []);

  return (
    <section className='orderDetailsPage'>
        <div className="orderDetails-heading">
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
            <div className='orderDetails-card'>      
                <div className="orderDetails-heading">
                    <h1 className="heading">{`Ordine n. ${params.orderId}`}</h1>
                </div>                   
                    
                <div className="progressBar">
                    <div className="progress" id='progress' style={{width: `${((formStepsNum - 1) / (2)) * 100 }%`}}></div>
                    <div className={formStepsNum >= 1 ? "progress-step progress-step-active" : "progress-step"} data-title='In lavorazione'></div>
                    <div className={formStepsNum >= 2 ? "progress-step progress-step-active" : "progress-step"} data-title='Spedito'></div>
                    <div className={formStepsNum >= 3 ? "progress-step progress-step-active" : "progress-step"} data-title='Completato'></div>
                </div>            

            <div className="orderDetails-body">
                <ul>
                  {
                    orderDetails[0]?.['order.shipping_type'] === 'Corriere' ?
                    <>
                    
                    <li>
                        <b>Data ordine: </b>{<Moment format='DD/MM/YYYY'>{orderDetails[0]?.['order.order_date']}</Moment> }
                    </li>
                    <li>
                        <b>Totale ordine: </b>{parseFloat(orderDetails[0]?.['order_total']).toFixed(2)} €
                    </li>
                    <li>
                        <b>Modalità di consegna: </b>{orderDetails[0]?.['order.shipping_type']}
                    </li>
                    <li>
                        <b>Corriere: </b>{orderDetails[0]?.['order.shipping_carrier']}
                    </li>
                    <li>
                        <b>Modalità di pagamento: </b>{orderDetails[0]?.['order.payment_method']}
                    </li>
                    <li>
                        <b>Codice spedizione: </b>{orderDetails[0]?.['order.shipping_code']}
                    </li>
                    <li>
                        <b>Indirizzo spedizione: </b>{orderDetails[0]?.['order.shipping_address']}
                    </li>
                    </>: orderDetails[0]?.['order.shipping_type'] === 'Ritiro in sede' ?
                    <>
                    <li>
                        <b>Data ordine: </b>{<Moment format='DD/MM/YYYY'>{orderDetails[0]?.['order.order_date']}</Moment> }
                    </li>
                    <li>
                        <b>Totale ordine: </b>{parseFloat(orderDetails[0]?.['order_total']).toFixed(2)} €
                    </li>
                    <li>
                        <b>Modalità di consegna: </b>{orderDetails[0]?.['order.shipping_type']}
                    </li>
                    <li>
                        <b>Modalità di pagamento: </b>{orderDetails[0]?.['order.payment_method']}
                    </li>
                    
                    </> : null
                  }
                    
                <li><b>Prodotti acquistati:</b></li>
                {
                    orderDetails.map((value, index) => {
                        return(
                            <>
                                
                                <li className='product-item' key={index}>
                                    {value['qty']} x {value['product.product_name']} - {parseFloat(value['priceEach']).toFixed(2)} €                               </li>
                                
                            </>
                        )
                    })
                }

                {
                  orderDetails[0]?.['order.shipping_type'] === 'Corriere' ?
                  <>
                    <li><b>Spese di spedizione: </b>{parseFloat(orderDetails[0]?.['order.shipping_cost']).toFixed(2)}€</li>
                
                    <li><b>Commissioni PayPal: </b>{parseFloat(orderDetails[0]?.['order.paypal_fee']).toFixed(2)}€</li>
                  
                  </>
                  : orderDetails[0]?.['order.shipping_type'] === 'Ritiro in sede' ?
                      <li><b>Commissioni PayPal: </b>{parseFloat(orderDetails[0]?.['order.paypal_fee']).toFixed(2)}€</li>
                  : null
                }
                
                <li><b>Note: </b>{orderDetails[0]?.['order.notes']}</li>
                
              </ul>

                
                
            </div>
        </div>

        }   
        
    </section>
  )

}

export default OrderDetails