import React, { useEffect, useState } from 'react'
import './userReviewPage.css'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

const UserReviewPage = () => {
  
    const GET_REVIEW_LIST = 'api/review/reviewListByUserID';
    const { auth } = useAuth();
    const [reviewList, setReviewList] = useState([]);
    const [statusSelected, setStatus] = useState('Da compilare');
    const [loading, setLoading] = useState(false);

  const handleStatusSel = (e) => {
    setStatus(e);
  }

  useEffect(() => {

    const getReviewList = async () => {

      setLoading(true);

      try {
      
        const response = await axios.post(GET_REVIEW_LIST, 
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
        setReviewList(response.data);

        } catch (err) {
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Recupero recensioni fallito!');
        }
      }

    } 

    getReviewList();   

  },[statusSelected, reviewList.length, auth.accessToken])
 

  return (
    <section className='reviewPageUser'>
      <div className="reviewPageUser-heading">
        <h2 className="reviewPageUser-title">Recensioni</h2>
      </div>
      <div className={ statusSelected === 'Da compilare' ? "card mb-4 shadow-sm small" : "card mb-4 shadow-sm"}>
        <div className="card-header bg-white">
        <div className="select-div">
            <select className="statusSelect"
                    onChange={(e) => handleStatusSel(e.target.value)}>
              <option value='Da compilare'>Da compilare</option>
              <option value='Compilata'>Compilate</option>
            </select>
        </div>
        </div>
        <div className="card-body">
          <div className="table-div">
            <h5 className="card-title">Ultime recensioni</h5>
            {
              loading ? 
                <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                  <ClipLoader
                  color={'#0f3460'}
                  loading={loading}
                  size={50}
                  />
              </div> : statusSelected === 'Da compilare'?
                  <table className="table">
                  <thead>
                    <tr>
                      <th scope='col'>Prodotto da recensire</th>
                      <th scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reviewList.map((value, index) => {
                        return(
                            <tr>
                              <td className='prod_name'>{value['product_name']}</td>
                              <td>
                                {
                                  <NavLink to={{
                                           pathname: `/userDashboard/reviews/newReview/${value['id']}`,
                                           
                                           }}
                                           state={{ product_name: value['product_name'] }}>
                                      <button>Crea</button>
                                  </NavLink>
                                }
                              </td>
                            </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                :
                <table className="table">
                  <thead>
                    <tr>
                      <th className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} scope='col'>ID</th>
                      <th className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} scope='col'>Data recensione</th>
                      <th className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} scope='col'>Prodotto acquistato</th>
                      <th className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} scope='col'>Testo recensione</th>
                      <th className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reviewList.map((value, index) => {
                        return(
                            <tr>
                              <td className={ statusSelected === 'Compilata' ? 'padding-ext' : ''}>{value['id']}</td>
                              <td className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} >{<Moment format='DD/MM/YYYY'>{value['review_date']}</Moment>}</td>
                              <td className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} >{value['product.product_name']}</td>
                              <td className={ statusSelected === 'Compilata' ? 'padding-ext text' : ''} >{value['review_text']}</td>
                              <td className={ statusSelected === 'Compilata' ? 'padding-ext' : ''} >
                                {
                                  <NavLink to={`/userDashboard/reviews/editReview/${value['id']}`}>
                                      <button>Dettaglio</button>
                                  </NavLink>
                                }
                                
                              </td>
                            </tr>
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

export default UserReviewPage