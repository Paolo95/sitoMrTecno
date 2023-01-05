import React, { useEffect } from 'react'
import axios from '../../../api/axios'
import useAuth from "../../../hooks/useAuth";
import './pageStyle.css'
import { useState } from 'react';
import Moment from 'react-moment';

const OrderPage = () => {

  const GET_ORDERS_URL = '/api/order/userOrders';
  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {

    const getOrders = async () => {

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
    <section className='dashboardPage'>
        <div className='order-div'>
          <div className="table-container">
            <h1 className="heading">Riepilogo ordini</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Importo</th>
                  <th>Stato</th>
                  <th>Dettaglio</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderList.map((value, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>{value['order.id']}</td>
                          <td><Moment format='DD/MM/YYYY'>{value['order.order_date']}</Moment></td>
                          <td>{value['order_total']}€</td>
                          <td>{value['order.order_status']}</td>
                          <td><button>Prova</button></td>
                        </tr>
                      </>                     
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    </section>
  )
}

export default OrderPage