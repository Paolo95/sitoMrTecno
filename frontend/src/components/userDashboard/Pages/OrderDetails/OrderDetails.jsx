import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import Moment from 'react-moment';
import './orderDetailsStyle.css';

const OrderDetails = () => {

  const params = useParams();
  const { auth } = useAuth();
  const ORDER_DETAILS_URL = `/api/order/orderDetails/${params.orderId}`; 
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {

    const getOrders = async () => {

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
        <div className='orderDetails-card'>         
            <div className="orderDetails-heading">
                <h1 className="heading">{`Ordine n. ${params.orderId}`}</h1>
            </div>                   
                
            <div className="orderDetails-track">
                <ul id='progress' className='text-center'>
                    {
                        orderDetails[0]?.['order.order_status'] === 'Ordine in lavorazione' ? 
                            <>
                                <li className='active'></li>
                                <li className='disabled'></li>
                                <li className='disabled'></li>
                            </> : orderDetails[0]?.['order.order_status'] === 'Ordine spedito' ?
                            <>
                                <li className='active'></li>
                                <li className='active'></li>
                                <li className='disabled'></li>
                            </> : orderDetails[0]?.['order.order_status'] === 'Ordine concluso' ?
                            <>
                                <li className='active'></li>
                                <li className='active'></li>
                                <li className='active'></li>
                            </> : <>
                                <li className='active'></li>
                                <li className='disabled'></li>
                                <li className='disabled'></li>
                            </>
                    }
                    
                </ul>
            </div>

            <div className="orderDetails-lists">
                <div className="orderDetails-list">
                    <i className="fas fa-file-invoice"></i>
                    <p>Ordine <br/> In lavorazione</p>
                </div>
                <div className="orderDetails-list">
                    <i className="fas fa-shipping-fast"></i>
                    <p>Ordine <br/> Spedito</p>
                </div>
                <div className="orderDetails-list">
                    <i className="fas fa-check-circle"></i>
                    <p>Ordine <br/> Conlcuso</p>
                </div>
            </div>

            <div className="orderDetails-body">
                <ul>
                    <li>
                        <b>Data ordine: </b>{<Moment format='DD/MM/YYYY'>{orderDetails[0]?.['order.order_date']}</Moment> }
                    </li>
                    <li>
                        <b>Totale ordine: </b>{parseFloat(orderDetails[0]?.['order_total']).toFixed(2)} €
                    </li>
                    <li>
                        <b>Corriere: </b>GLS
                    </li>
                    <li>
                        <b>Codice spedizione: </b>{orderDetails[0]?.['order.shipping_code']}
                    </li>
                <span><b>Prodotti acquistati:</b></span>
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
                
                <li><b>Spese di spedizione: </b>{orderDetails[0]?.['order.shipping_cost']}€</li>
                </ul>

                
                
            </div>
        </div>
    </section>
  )

}

export default OrderDetails