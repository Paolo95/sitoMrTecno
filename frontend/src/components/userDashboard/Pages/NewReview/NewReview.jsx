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
    const [responseOk, setResponseOk] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewStars, setReviewStars] = useState(0);
    const [serverMsg, setServerMsg] = useState('');
    const NEW_REVIEW_URL = 'api/review/newReview';
    const { auth } = useAuth();
    const location = useLocation();

    const createReview = async () => {

        setLoading(true);

        try {
        
        const response = await axios.post(NEW_REVIEW_URL, 
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
        setServerMsg(response.data);
        setResponseOk(true);
        

        } catch (err) {
        if(!err?.response){
            console.error('Server non attivo!');
        }else if(err.response?.status === 500){
            setServerMsg(err.response?.data);
            setLoading(false);
            setCreateSuccess(true);
            setConfirm(false);
            setResponseOk(false);
        }else{
            console.error('Inserimento della recensione fallito!');
        }
        }    
        
    }

    const handleReviewChange = (e) => {
        setReviewText(e);
    }

    const createConfirm = () => {
        setConfirm(true);
    }

    const handleBtnSel = (btnNum) => {
        setReviewStars(btnNum);
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
                        <h2 className="newReview-title">Recensione prodotto: {location?.state.product_name}</h2>
                    </div>

                    <div className="card mb-4 shadow-sm">
                        
                        <div className='newReview-body'>
                            <div className='newReview-text'>
                                {
                                    confirm ? 
                                    <div className='confirm-body'>
                                        <span>Sei sicuro di voler creare la recensione?</span>
                                        <div className="confirm-div">
                                        <button className='btn' onClick={() => setConfirm(false)}>Annulla</button>
                                        <button className='btn' onClick={() => createReview()}>Conferma</button>
                                        </div>
                                    </div>
                                    : !createSuccess ? 
                                    <>
                                    <div>Testo recensione:</div>
                                    <textarea
                                        placeholder='Scrivi il testo della nuova recensione...'
                                        rows={10}
                                        onChange={(e) => handleReviewChange(e.target.value)}/>
                                    <div>Valutazione (da 1 a 5): </div>
                                    <div className='starBtn-div'>
                                        <button className={ reviewStars === 1 ? 'btnSel': ''} onClick={() => handleBtnSel(1)}>1</button>
                                        <button className={ reviewStars === 2 ? 'btnSel': ''} onClick={() => handleBtnSel(2)}>2</button>
                                        <button className={ reviewStars === 3 ? 'btnSel': ''} onClick={() => handleBtnSel(3)}>3</button>
                                        <button className={ reviewStars === 4 ? 'btnSel': ''} onClick={() => handleBtnSel(4)}>4</button>
                                        <button className={ reviewStars === 5 ? 'btnSel': ''} onClick={() => handleBtnSel(5)}>5</button>
                                    </div>
                                    {
                                        reviewText.length > 0 && reviewStars !== 0?
                                            <div className='btn-div'>
                                                <button className='btn' onClick={createConfirm}>Inserisci recensione</button>
                                            </div>
                                            :
                                            <div className='btn-div'>
                                                <button className='btn disabled'>Inserisci recensione</button>
                                            </div>
                                            
                                    }
                                    </> : responseOk ?
                                        <div className='success'>{serverMsg}!</div>
                                        :
                                        <div className='notSuccess'>{serverMsg}!</div>
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