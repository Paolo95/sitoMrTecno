import React, { useEffect } from 'react'
import './orderPageAdmin.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import { useState } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const OrderPageAdmin = () => {

  const GET_ORDER_LIST = 'api/order/orderList';
  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [statusSelected, setStatus] = useState('In lavorazione');
  const [idSearched, setIDSearched] = useState('');
  const [emailSearched, setEmailSearched] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStatusSel = (e) => {
    setStatus(e);
  }

  const handleIDSearch = (e) => {
    setIDSearched(e);
  }

  const handleEmailSearch = (e) => {
    setEmailSearched(e);
  }

  useEffect(() => {

    const newProductForm = async () => {

      setLoading(true);

      try {
      
        const response = await axios.post(GET_ORDER_LIST, 
            { 
                status: statusSelected,
                idSearched: idSearched,
                emailSearched: emailSearched,
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

    newProductForm();   

  },[statusSelected, emailSearched, idSearched, orderList.length, auth.accessToken])
 

  return (
    <section className='orderPageAdmin'>
      <div className="orderPageAdmin-heading">
        <h2 className="orderPageAdmin-title">Ordini</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
        <div className='search-div'>
            <input type="number"
                   min={1}
                   placeholder='Cerca ID...'
                   onChange={(e) => handleIDSearch(e.target.value)} />
        </div>
        <div className='search-div'>
            <input type="text"
                   placeholder='Cerca email...'
                   onChange={(e) => handleEmailSearch(e.target.value)} />
        </div>
        <div className="select-div">
            <select className="statusSelect"
                    onChange={(e) => handleStatusSel(e.target.value)}>
              <option value='In lavorazione'>In lavorazione</option>
              <option value='In spedizione'>In spedizione</option>
              <option value='Concluso'>Concluso</option>
            </select>
        </div>
        </div>
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
                      <th scope='col'>E-mail</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Importo</th>
                      <th scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orderList.map((value, index) => {
                        return(
                          <>
                            <tr key={index}>
                              <td className='id'>{value['order.id']}</td>
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


            }
            
            
            
          </div>
                        
        
        </div>
      </div>
    </section>
  )
}

export default OrderPageAdmin