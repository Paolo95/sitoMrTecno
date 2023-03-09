import React, { useState } from 'react'
import './newReview.css'
import { useLocation, useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';

const NewReview = () => {
    
    const params = useParams(); 
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewStars, setReviewStars] = useState(1);
    const NEW_REVIEW_URL = 'api/review/newReview';
    const { auth } = useAuth();
    const location = useLocation();

    const createReview = async () => {

        setLoading(true);

        try {
        
        await axios.post(NEW_REVIEW_URL, 
            { 
                reviewText: reviewText,
                reviewStars: reviewStars,
                productId: params.productId
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth?.accessToken}`
                },
                withCredentials: true
            }
            );
    
        setCreateSuccess(true);
        setLoading(false);
        setConfirm(false);
        

        } catch (err) {
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            console.error(err.response?.data);
        }else{
            console.error('Inserimento della recensione fallito!');
        }
        }    
        
    }

    const handleReviewChange = (e) => {
        setReviewText(e);
    }

    const handleStarsChange = (e) => {
        setReviewStars(e);
    }

    const createConfirm = () => {
        setConfirm(true);
    }

    return (
        <section className="newReview">

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
                
                    <div className="newReview-heading">
                        <h2 className="newReview-title">Recensione prodotto: {location.state.product_name}</h2>
                    </div>

                    <div className="card mb-4 shadow-sm">
                        
                        <div className='newReview-body'>
                            <div className='newReview-text'>
                                {
                                    confirm ? 
                                    <div className='confirm-div'>
                                        <button className='btn' onClick={() => setConfirm(false)}>Annulla</button>
                                        <button className='btn' onClick={() => createReview()}>Conferma</button>
                                    </div>
                                    : !createSuccess ? 
                                    <>
                                    <textarea
                                        placeholder='Scrivi il testo della nuova recensione...'
                                        onChange={(e) => handleReviewChange(e.target.value)}/>
                                    <input type="number"
                                       min={1}
                                       max={5}
                                       defaultValue={1}
                                       onChange={(e) => handleStarsChange(e.target.value)} />
                                    {
                                        reviewText.length > 0 ?
                                            <button className='btn' onClick={createConfirm}>Inserisci recensione</button>
                                            :
                                            <button className='btn disabled'>Inserisci recensione</button>
                                    }
                                    </> :
                                    <div className='success'>Recensione inserita correttamente!</div>
                                }
                                
                                
                            </div>
                        </div>
                        
                    </div>
                    
                    </>
            }            

        </section>
    )
}

export default NewReview