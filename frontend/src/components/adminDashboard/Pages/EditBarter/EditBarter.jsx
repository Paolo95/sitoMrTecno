import React, { useEffect } from 'react'
import './editBarter.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';

const EditBarter = () => {

    const params = useParams();
    const { auth } = useAuth();
    const BARTER_DETAILS_URL = `/api/barter/barterDetails/${params.barterID}`; 
    const EDIT_BARTER_URL = `/api/barter/editBarter`; 
    const [barterDetails, setBarterDetails] = useState([]);
    const [date, setDate] = useState('');
    const [shipping_code, setShippingCode] = useState('');
    const [shipping_carrier, setCarrier] = useState('');
    const [barterStatus, setBarterStatus] = useState('');
    const [total, setTotal] = useState(0);
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editDone, setEditDone] = useState(false);

    useEffect(() => {

        const getOrders = async () => {
    
          setLoading(true);

          try {
           
            const response = await axios.post(BARTER_DETAILS_URL, 
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
            setBarterDetails(response.data);
            const res = response.data;
            setDate(res[0]['barter_date'])
            setShippingCode(res[0]['shipping_code'])
            setCarrier(res[0]['shipping_carrier'])
            setBarterStatus(res[0]['status']);
            setTotal(res[0]['total'])
      
          } catch (err) {
            if (!err?.response) 
              alert('Server non attivo!');
            else if (err.response.status === 500 ){
              alert(err.response?.data);
            }
            else if (err.response.status === 404 ){
              alert(err.response?.data);
            }else {
              alert('Recupero permuta fallito!');
            }
      
          }    
          
        }
        
        getOrders();
    
        // eslint-disable-next-line
    }, []);

    const handleEdit = () => {

        const editBarter = async () => {
    
          setEditDone(true);

            try {
             
              const response = await axios.post(EDIT_BARTER_URL, 
                { 
                    id: params.barterID,
                    editedDate: date,
                    editedShippingCode: shipping_code,
                    editedShippingCarrier: shipping_carrier,
                    editedStatus: barterStatus,
                    editedTotal: total,
                },
                {
                    headers: {
                      'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
              );  
      
              setEditDone(false);
              alert(response.data);
        
            } catch (err) {
              if (!err?.response) 
                alert('Server non attivo!');
              else if (err.response.status === 500 ){
                alert(err.response?.data);
              }
              else if (err.response.status === 404 ){
                alert(err.response?.data);
              }else {
                alert('Modifica ordine fallita!');
              }
        
            }    
            
        }

          if(barterStatus === 'In lavorazione' && total !== 0){
            alert('Errore: modifica lo stato della permuta se vuoi modificare il totale!')
          } else if (barterStatus === 'Valutazione effettuata' && total === 0){
            alert('Errore: modifica il totale della permuta se vuoi modificare lo stato!')
          } else if(barterStatus === 'Prodotto spedito' && (shipping_carrier === '' || shipping_code === '') ){
            alert('Errore: modifica il codice e il corriere della spedizione se vuoi modificare il totale!')
          } else {
            editBarter();
          }         
      
          // eslint-disable-next-line
    }

    const handleDateChange = (e) => {
        setIsChanged(true);
        setDate(e);
    }

    const handleOrderStatus = (e) => {
      setIsChanged(true);
      setBarterStatus(e);
  }

    const handleShippingChange = (e) => {
        setIsChanged(true);
        setShippingCode(e);
    }

    const handleCarrierChange = (e) => {
        setIsChanged(true);
        setCarrier(e);
    }

    const handleTotalChange = (e) => {
        setIsChanged(true);
        setTotal(e);
  }
    
  return (

    <section className='editBarter'>
        <div className="editBarter-heading">
            <h2 className='editBarter-title'>
              Modifica permuta
              
              </h2>
            <div className="createBtn-div">
                {
                    isChanged ? <button className='btn btn-create' onClick={handleEdit}>
                                Modifica permuta
                                <ClipLoader
                                      color={'white'}
                                      loading={editDone}
                                      size={10}
                                      />
                                </button>
                              : <button disabled className='btn btn-create disabled' onClick={handleEdit}>Modifica permuta</button>
                }
                
            </div>
        </div>                   
                        
        <div className="editBarter-content">
            <div className="editBarter-body">
                <div className="editBarter-card card shadow-sm">
                    <div className="card-body">
                      {
                        loading ? 
                        
                          <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                            <ClipLoader
                            color={'#0f3460'}
                            loading={loading}
                            size={50}
                            />
                          </div> :
                          <ul>
                              <li>
                                  <b>Data permuta: </b>
                                  <input type="date"
                                        className='editable' 
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        defaultValue={barterDetails[0]?.['barter_date']}/>
                              </li>
                              <li>
                                  <b>Totale permuta: </b>
                                  <input className='number' 
                                        type="number" 
                                        min={0}
                                        step={0.01}
                                        onChange={(e) => handleTotalChange(e.target.value)}
                                        defaultValue={barterDetails[0]?.['total']}/> €
                              </li>
                              <li>
                                  <b>Corriere: </b>
                                  <input className='editable' 
                                        type="text" 
                                        onChange={(e) => handleCarrierChange(e.target.value)}
                                        defaultValue={barterDetails[0]?.['shipping_carrier']}/>
                              </li>
                              <li>
                                  <b>Codice spedizione: </b>
                                  <input className='editable' type="text"
                                        onChange={(e) => handleShippingChange(e.target.value)}
                                        defaultValue={barterDetails[0]?.['shipping_code']}/>
                              </li>

                              <li>
                                  <b>Stato permuta: </b>
                                  <select className='statusSelect'
                                          onChange={(e) => handleOrderStatus(e.target.value)}
                                          defaultValue={barterStatus === 'In lavorazione' ? 'In lavorazione' : 
                                                        barterStatus === 'Valutazione effettuata' ? 'Valutazione effettuata' :
                                                        barterStatus === 'Pagamento effettuato' ? 'Pagamento effettuato' : 
                                                        barterStatus === 'Oggetti ricevuti' ? 'Oggetti ricevuti' :
                                                        barterStatus === 'Prodotto spedito' ? 'Prodotto spedito' : 
                                                        barterStatus === 'Concluso' ? 'Concluso' : null}>
                                      
                                          <option value={'In lavorazione'}>In lavorazione</option>
                                          <option value={'Valutazione effettuata'}>Valutazione effettuata</option>
                                          <option value={'Pagamento effettuato'}>Pagamento effettuato</option>
                                          <option value={'Oggetti ricevuti'}>Oggetti ricevuti</option>
                                          <option value={'Prodotto spedito'}>Prodotto spedito</option>
                                          <option value={'Concluso'}>Concluso</option>
                                                                            
                                  </select>
                              </li>
                              <span><b>Prodotti permutati:</b></span>
                              
                              <ul>
                                {
                                  barterDetails[0]?.['barter_items'] !== undefined ?
                                    Object.values(JSON.parse(barterDetails[0]?.['barter_items'])).map((item, index) => {
                                      return(
                                          <div key={index}>
                                            <li>Nome: {item.name}</li>
                                            <li>Descrizione: {item.description}</li>
                                          </div>
                                          
                                      )
                                  })
                                  : null
                                }
                              </ul>
                              
                          
                              <li><b>Spese di spedizione: </b>{parseFloat(barterDetails[0]?.['shipping_cost']).toFixed(2)}€</li>

                              <li><b>Commissioni PayPal: </b>{parseFloat(barterDetails[0]?.['paypal_fee']).toFixed(2)}€</li>
                          </ul>
                        
                      }
                        
                    </div>
                </div>
                            
                            
            </div>
        </div>
    </section>

    
  )
}

export default EditBarter