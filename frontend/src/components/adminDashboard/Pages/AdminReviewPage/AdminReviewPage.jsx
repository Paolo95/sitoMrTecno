import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import './adminReviewPage.css'

const AdminReviewPage = () => {
    const GET_REVIEW_LIST = 'api/review/reviewListAdmin';
    const { auth } = useAuth();
    const [reviewList, setReviewList] = useState([]);
    const [statusSelected, setStatus] = useState('Da rispondere');
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
    <section className='reviewPageAdmin'>
      <div className="reviewPageAdmin-heading">
        <h2 className="reviewPageAdmin-title">Recensioni</h2>
      </div>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-white">
        <div className="select-div">
            <select className="statusSelect"
                    onChange={(e) => handleStatusSel(e.target.value)}>
              <option value='Da rispondere'>Da rispondere</option>
              <option value='Risposte'>Risposte</option>
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
              </div> :
                <table className="table">
                  <thead>
                    <tr>
                      <th scope='col'>ID</th>
                      <th scope='col'>Data recensione</th>
                      <th scope='col'>Nome utente</th>
                      <th scope='col'>Testo recensione</th>
                      <th scope='col'>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reviewList.map((value, index) => {
                        return(
                            <tr>
                              <td>{value['id']}</td>
                              <td>{<Moment format='DD/MM/YYYY'>{value['review_date']}</Moment>}</td>
                              <td className='text'>{value['user.username']}</td>
                              <td className='text'>{value['review_text']}</td>
                              <td>
                                {
                                  <NavLink to={`/adminDashboard/reviews/editReply/${value['id']}`}
                                           state={{ product_name: value['product_name'] }}>
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

export default AdminReviewPage