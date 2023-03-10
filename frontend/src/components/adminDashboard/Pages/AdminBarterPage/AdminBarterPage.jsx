import React, { useEffect } from 'react'
import './AdminBarterPage.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import { useState } from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminBarterPage = () => {

  const GET_BARTER_LIST = 'api/barter/barterList';
  const { auth } = useAuth();
  const [barterList, setBarterList] = useState([]);
  const [statusSelected, setStatus] = useState('In lavorazione');
  const [loading, setLoading] = useState(false);

  const handleStatusSel = (e) => {
    setStatus(e);
  }

  useEffect(() => {

    const newProductForm = async () => {

      setLoading(true);

      try {
      
        const response = await axios.post(GET_BARTER_LIST, 
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

        setLoading(false);
        setBarterList(response.data);

        } catch (err) {
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Recupero permute fallito!');
        }
      }

    } 

    newProductForm();   

  },[statusSelected, barterList.length, auth.accessToken])

  return (
    <section className='adminBarterPage'>
      <div className="adminBarterPage-heading">
        <h2 className="adminBarterPage-title">Permute</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
        <div className="select-div">
            <select className="statusSelect"
                    onChange={(e) => handleStatusSel(e.target.value)}>
              <option value='In lavorazione'>In lavorazione</option>
              <option value='Valutazione effettuata'>Valutazione effettuata</option>
              <option value='Pagamento effettuato'>Pagamento effettuato</option>
              <option value='Oggetti ricevuti'>Oggetti ricevuti</option>
              <option value='Prodotto spedito'>Prodotto spedito</option>
              <option value='Concluso'>Concluso</option>
            </select>
        </div>
        </div>
        <div className="card-body">
          <div className="table-div">
            <h5 className="card-title">Ultime permute</h5>
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
                      <th scope='col'>Telefono</th>
                      <th scope='col'>E-mail</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Importo</th>
                      <th scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      barterList.map((value,index) => {
                        return(
                          <>
                            <tr key={index}>
                              <td className='id'>{value['id']}</td>
                              <td>{<Moment format='DD/MM/YYYY'>{value['barter_date']}</Moment>}</td>
                              <td>{value['barter_telephone']}</td>
                              <td>{value['user.email']}</td>
                              <td>{value['status']}</td>
                              <td>{parseFloat(value['total']).toFixed(2)} €</td>
                              <td>
                                {
                                  <NavLink to={`/adminDashboard/barters/editBarter/${value['id']}`}>
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

export default AdminBarterPage