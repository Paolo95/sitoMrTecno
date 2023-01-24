import React, { useEffect } from 'react'
import './orderPageAdmin.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import { useState } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

const OrderPageAdmin = () => {

  const GET_ORDER_LIST = 'api/order/orderList';
  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [statusSelected, setStatus] = useState('Ordine in lavorazione');

  const handleStatusSel = (e) => {
    setStatus(e);
  }

  useEffect(() => {

    const newProductForm = async () => {

      try {
      
        const response = await axios.post(GET_ORDER_LIST, 
            { 
                status: statusSelected,
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
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Recupero ordini fallito!');
        }
      }

    } 

    newProductForm();   

  },[statusSelected, orderList.length, auth.accessToken])
 

  return (
    <section className='orderPageAdmin'>
      <div className="orderPageAdmin-heading">
        <h2 className="orderPageAdmin-title">Ordini</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
        <div className="select-div">
            <select className="statusSelect"
                    onChange={(e) => handleStatusSel(e.target.value)}>
              <option value='Ordine in lavorazione'>In lavorazione</option>
              <option value='Ordine in spedizione'>In spedizione</option>
              <option value='Ordine concluso'>Concluso</option>
            </select>
        </div>
        </div>
        <div className="card-body">
          <div className="table-div">
          <h5 className="card-title">Ultimi ordini</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Data</th>
                  <th scope='col'>E-mail</th>
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
                        <tr id={index}>
                          <td>{value['order.id']}</td>
                          <td>{<Moment format='DD/MM/YYYY'>{value['order.order_date']}</Moment>}</td>
                          <td>{value['order.user.email']}</td>
                          <td>{value['order.order_status']}</td>
                          <td>{value['order_total']} €</td>
                          <td>
                            {
                              <NavLink to={`/adminDashboard/orders/editOrder/${value['order.id']}`}>
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
          </div>
                        
        
        </div>
      </div>
    </section>
  )
}

export default OrderPageAdmin