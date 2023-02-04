import React, { useEffect } from 'react'
import axios from '../../../../api/axios'
import useAuth from "../../../../hooks/useAuth";
import './orderPageStyle.css'
import { useState } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const OrderPage = () => {

  const GET_ORDERS_URL = '/api/order/userOrders';
  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getOrders = async () => {

      setLoading(true);

      try {
       
        const response = await axios.post(GET_ORDERS_URL, 
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
        setOrderList(response.data);
  
      } catch (err) {
        if (!err?.response) 
          alert('Server non attivo!');
        else if (err.response.status === 500 ){
          alert(err.response?.data);
        }
        else if (err.response.status === 404 ){
          alert(err.response?.data);
        }else {
          alert('Recupero ordini fallito!');
        }
  
      }    
      
    }
    
    getOrders();

    // eslint-disable-next-line
  }, [])
  
 return (
    <section className='orderPage'>
      <div className="orderPage-heading">
        <h1 className="heading">Riepilogo ordini</h1>
      </div>
      <div className="orderPage-card">
        {
            loading ? 
            <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                <ClipLoader
                  color={'#0f3460'}
                  loading={loading}
                  size={50}
                />
            </div>
            : <div className='order-div'>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th id='id'>ID</th>
                        <th>Data</th>
                        <th>Importo</th>
                        <th>Stato</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderList.map((value, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td id='id'>{value['order.id']}</td>
                                <td><Moment format='DD/MM/YYYY'>{value['order.order_date']}</Moment></td>
                                <td>{parseFloat(value['order_total']).toFixed(2)}€</td>
                                <td id='status'>{value['order.order_status']}</td>
                                <td>
                                  <NavLink to={`/userDashboard/orderDetails/${value['order.id']}`}>                              
                                    <button>Dettaglio</button>                      
                                  </NavLink>
                                </td>
                              </tr>
                            </>                     
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
            </div>
        }
        
      </div>
        
    </section>
  )
}

export default OrderPage