import React, { useEffect } from 'react'
import './orderPageStyle.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import { useState } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const OrderPage = () => {

  const GET_ORDER_LIST = 'api/order/userOrders';
  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getOrderList = async () => {

      setLoading(true);

      try {
      
        const response = await axios.post(GET_ORDER_LIST, 
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
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Recupero ordini fallito!');
        }
      }

    } 

    if (orderList.length === 0) getOrderList();   

  },[auth.accessToken, orderList.length])

  return (
    <section className='orderPage'>
      <div className="orderPage-heading">
        <h2 className="orderPage-title">Ordini</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-div">
            <h5 className="card-title">Ultimi ordini</h5>
            {
              loading ? 
                <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                  <ClipLoader
                  color={'#0f3460'}
                  loading={loading}
                  size={50}
                  />
              </div> :
                  <table className="table">
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Data</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Importo</th>
                      <th scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderList.map((value,index) => {
                        return(
                          <>
                            <tr key={index}>
                              <td>{value['order.id']}</td>
                              <td>{<Moment format='DD/MM/YYYY'>{value['order.order_date']}</Moment>}</td>
                              <td>{value['order.order_status']}</td>
                              <td>{parseFloat(value['order_total']).toFixed(2)} €</td>
                              <td>
                                {
                                  <NavLink to={`/userDashboard/home/orderDetails/${value['order.id']}`}>
                                      <button>Dettaglio</button>
                                  </NavLink>
                                }
                              </td>
                            </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>


            }
            
            
            
          </div>
                        
        
        </div>
      </div>
    </section>
  )
}

export default OrderPage