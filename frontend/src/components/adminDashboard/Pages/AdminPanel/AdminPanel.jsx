import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './adminPanelStyle.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import Moment from 'react-moment';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminPanel = () => {

  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [barterList, setBarterList] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [barterLoading, setBarterLoading] = useState(false);
  const GET_ORDER_LIST = 'api/order/getRecentOrders';
  const GET_BARTER_LIST = 'api/barter/getRecentBarters';

  useEffect(() => {

    const orderList = async () => {

      setOrderLoading(true);

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

        setOrderLoading(false);
        setOrderList(response.data);

      } catch (err) {
        if (!err?.response) {
          console.error('Server non attivo!');
        } else if (err.response?.status === 500) {
          console.error(err.response?.data);
        } else {
          console.error('Recupero ordini fallito!');
        }
      }

    }

    const barterList = async () => {

      setBarterLoading(true);

      try {

        const response = await axios.post(GET_BARTER_LIST,
          {

          },
          {
            headers: {
              'Authorization': `Bearer ${auth?.accessToken}`
            },
            withCredentials: true
          }
        );

        setBarterLoading(false);
        setBarterList(response.data);

      } catch (err) {
        if (!err?.response) {
          console.error('Server non attivo!');
        } else if (err.response?.status === 500) {
          console.error(err.response?.data);
        } else {
          console.error('Recupero permute fallito!');
        }
      }

    }

    orderList();
    barterList();

  }, [orderList.length, barterList.lenght, auth.accessToken])


  return (
    <section className="adminPanel">
      <div className="adminPanel-heading">
        <h2 className='adminPanel-title'>Dashboard</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
        <h5 className="card-title">Ultimi ordini</h5>
          {
            orderLoading ?
              <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                  <ClipLoader
                  color={'#0f3460'}
                  loading={orderLoading}
                  size={50}
                  />
              </div>
              :
              <>
              <div className="table-div">
                <table className="table">
                  <tbody>
                    {
                      orderList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {<Moment format='DD/MM/YYYY'>{value['order.order_date']}</Moment>}
                            </td>
                            <td>
                              {value['order.user.username']}
                            </td>
                            <td>
                              <span>{parseFloat(value['order_total']).toFixed(2)}€</span>
                            </td>
                            <td>
                              <span>{value['order.order_status']}</span>
                            </td>
                            <td className='dash-btn'>
                              <NavLink to={`/AdminDashboard/orders/editOrder/${value['order.id']}`}>
                                <button>Dettaglio</button>
                              </NavLink>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              
              </>
          }
          
        </div>

        
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
        <h5 className="card-title">Ultime permute da valutare</h5>
          {
            barterLoading ?
              <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                  <ClipLoader
                  color={'#0f3460'}
                  loading={barterLoading}
                  size={50}
                  />
              </div>
              :
              <>
              <div className="table-div">
                <table className="table">
                  <tbody>
                    {
                      barterList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {<Moment format='DD/MM/YYYY'>{value['barter_date']}</Moment>}
                            </td>
                            <td>
                              {value['user.username']}
                            </td>
                            <td className='dash-btn'>
                              <NavLink to={`/AdminDashboard/barters/editBarter/${value['id']}`}>
                                <button>Dettaglio</button>
                              </NavLink>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              
              </>
          }
          
        </div>

        
      </div>
    </section>

  )
}

export default AdminPanel