import React, { useEffect } from 'react'
import './editOrder.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';

const EditOrder = () => {

    const params = useParams();
    const { auth } = useAuth();
    const ORDER_DETAILS_URL = `/api/order/orderAdminDetails/${params.orderID}`; 
    const EDIT_ORDER_URL = `/api/order/editOrder`; 
    const [orderDetails, setOrderDetails] = useState([]);
    const [date, setDate] = useState('');
    const [shipping_code, setShippingCode] = useState('');
    const [shipping_carrier, setCarrier] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [isChanged, setIsChanged] = useState(false);

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
            const res = response.data;
            setDate(res[0]['order.order_date'])
            setShippingCode(res[0]['order.shipping_code'])
            setCarrier(res[0]['shipping_carrier'])
            setOrderStatus(res[0]['order.order_status']);
      
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

    const handleEdit = () => {

        const editOrder = async () => {
    
            try {
             
              const response = await axios.post(EDIT_ORDER_URL, 
                { 
                    id: params.orderID,
                    editedDate: date,
                    editedShippingCode: shipping_code,
                    editedShippingCarrier: shipping_carrier,
                    editedStatus: orderStatus,
                },
                {
                    headers: {
                      'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
              );  
      
              alert(response.data);
        
            } catch (err) {
              if (!err?.response) 
                alert('Server non attivo!');
              else if (err.response.status === 500 ){
                alert(err.response?.data);
              }
              else if (err.response.status === 404 ){
                alert(err.response?.data);
              }else {
                alert('Modifica ordine fallita!');
              }
        
            }    
            
        }
          
          editOrder();
      
          // eslint-disable-next-line
    }

    const handleDateChange = (e) => {
        setIsChanged(true);
        setDate(e);
    }

    const handleOrderStatus = (e) => {
      setIsChanged(true);
      setOrderStatus(e);
  }

    const handleShippingChange = (e) => {
        setIsChanged(true);
        setShippingCode(e);
    }

    const handleCarrierChange = (e) => {
        setIsChanged(true);
        setCarrier(e);
    }

  return (

    <section className='editOrder'>
        <div className="editOrder-heading">
            <h2 className='editOrder-title'>Modifica ordine</h2>
            <div className="createBtn-div">
                {
                    isChanged ? <button className='btn btn-create' onClick={handleEdit}>Modifica ordine</button>
                              : <button disabled className='btn btn-create disabled' onClick={handleEdit}>Modifica ordine</button>
                }
                
            </div>
        </div>                   
                        
        <div className="editOrder-content">
            <div className="editOrder-body">
                <div className="editOrder-card card shadow-sm">
                    <div className="card-body">
                        <ul>
                            <li>
                                <b>Data ordine: </b>
                                <input type="date"
                                       className='editable' 
                                       onChange={(e) => handleDateChange(e.target.value)}
                                       defaultValue={orderDetails[0]?.['order.order_date']}/>
                            </li>
                            <li>
                                <b>Totale ordine: </b>
                                <span>{orderDetails[0]?.['order_total']} €</span>
                            </li>
                            <li>
                                <b>Corriere: </b>
                                <input className='editable' 
                                       type="text" 
                                       onChange={(e) => handleCarrierChange(e.target.value)}
                                       defaultValue={orderDetails[0]?.['order.shipping_carrier']}/>
                            </li>
                            <li>
                                <b>Codice spedizione: </b>
                                <input className='editable' type="text"
                                       onChange={(e) => handleShippingChange(e.target.value)}
                                       defaultValue={orderDetails[0]?.['order.shipping_code']}/>
                            </li>

                            <li>
                                <b>Stato ordine: </b>
                                <select className='statusSelect'
                                        onChange={(e) => handleOrderStatus(e.target.value)}>
                                    {
                                      orderStatus==='Ordine in lavorazione' ?
                                      <>
                                        <option selected value={'Ordine in lavorazione'}>In lavorazione</option>
                                        <option value={'Ordine in spedizione'}>In spedizione</option>
                                        <option value={'Ordine Concluso'}>Concluso</option>
                                      </>
                                        :
                                        orderStatus==='Ordine in spedizione' ?
                                        <>
                                          <option value={'Ordine in lavorazione'}>In lavorazione</option>
                                          <option selected value={'Ordine in spedizione'}>In spedizione</option>
                                          <option value={'Ordine Concluso'}>Concluso</option>
                                        </>
                                        :
                                        <>
                                          <option value={'Ordine in lavorazione'}>In lavorazione</option>
                                          <option value={'Ordine in spedizione'}>In spedizione</option>
                                          <option selected value={'Ordine Concluso'}>Concluso</option>
                                        </>
                                       
                                        
                                      
                                      
                                    }
                                  
                                </select>
                            </li>
                            <span><b>Prodotti acquistati:</b></span>
                            {
                            orderDetails.map((value, index) => {
                                return(
                                    <>
                                        
                                        <li className='product-item' key={index}>                                            
                                            {value['qty']} x {value['product.product_name']} - {parseFloat(value['priceEach']).toFixed(2)} €
                                        </li>
                               
                                        
                                    </>
                                )
                            })
                            }
                        
                            <li><b>Spese di spedizione: </b>{orderDetails[0]?.['order.shipping_cost']}€</li>
                        </ul>
                    </div>
                </div>
                            
                            
            </div>
        </div>
    </section>

    
  )
}

export default EditOrder