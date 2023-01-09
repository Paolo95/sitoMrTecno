import React from 'react'
import { NavLink} from 'react-router-dom';
import './adminPanelStyle.css'

const AdminPanel = () => {
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
                <tr>
                  <td>
                    <b>Utente</b>
                  </td>
                  <td>mail@mail.com</td>
                  <td>356,00€</td>
                  <td>
                    14/10/2022
                  </td>
                  <td className='dash-btn'>
                    <NavLink to={'/AdminDashboard/orders'}>
                      <button>Dettaglio</button>
                    </NavLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default AdminPanel