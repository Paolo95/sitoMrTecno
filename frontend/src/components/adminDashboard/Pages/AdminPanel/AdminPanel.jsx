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
  const [loading, setLoading] = useState(false);
  const GET_ORDER_LIST = 'api/order/getRecentOrders';

  console.log(auth.accessToken)

  useEffect(() => {

    const orderList = async () => {

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
        if (!err?.response) {
          console.error('Server non attivo!');
        } else if (err.response?.status === 500) {
          console.error(err.response?.data);
        } else {
          console.error('Recupero ordini fallito!');
        }
      }

    }

    orderList();

  }, [orderList.length, auth.accessToken])


  return (
    <section className="adminPanel">
      <div className="adminPanel-heading">
        <h2 className='adminPanel-title'>Dashboard</h2>
      </div>
      <div className="card hide mb-4 shadow-sm">
        <div className="card-body">
        <h5 className="card-title">Ultimi ordini</h5>
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
                              {value['order.user.email']}
                            </td>
                            <td>
                              {value['order_total']} €
                            </td>
                            <td>
                              {value['order.order_status']}
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
    </section>

  )
}

export default AdminPanel