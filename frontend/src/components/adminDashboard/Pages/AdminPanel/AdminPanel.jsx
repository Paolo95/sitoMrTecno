import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './adminPanelStyle.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import Moment from 'react-moment';

const AdminPanel = () => {

  const { auth } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const GET_ORDER_LIST = 'api/order/getRecentOrders';

  useEffect(() => {

    const orderList = async () => {

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

        setOrderList(response.data);
        console.log(response.data)

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
      <div className="row">
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle sales">
                <i className="fas fa-euro-sign"></i>
              </span>
              <div className="text">
                <h6 className='Total-sales'>Totale vendite</h6>
                <span>400€</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle orders">
                <i className="fas fa-euro-sign"></i>
              </span>
              <div className="text">
                <h6 className='Total-sales'># di ordini</h6>
                <span>400</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle products">
                <i className="fas fa-euro-sign"></i>
              </span>
              <div className="text">
                <h6 className='Total-sales'># di prodotti</h6>
                <span>400</span>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="card hide mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Ultimi ordini</h5>
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
                          <NavLink to={'/AdminDashboard/orders'}>
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
        </div>
      </div>
    </section>

  )
}

export default AdminPanel