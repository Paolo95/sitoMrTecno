import React, { useEffect, useState } from 'react'
import './adminEditReview.css'
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';

const AdminEditReview = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [editDone, setEditDone] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [serverMsg, setServerMsg] = useState('');
    const [reviewStars, setReviewStars] = useState(0);
    const [reviewID, setReviewId] = useState();
    const EDIT_REPLY_URL = 'api/review/editReply';
    const REVIEW_INFO_URL = 'api/review/reviewAdminInfo';
    const { auth } = useAuth();

    const editReply = async () => {

        setLoading(true);

        try {

            const response = await axios.post(EDIT_REPLY_URL,
                {
                    replyText: replyText,
                    id: params.reviewID,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
            );

            setEditSuccess(true);
            setLoading(false);
            setConfirm(false);
            setServerMsg(response.data);
            setEditDone(true);


        } catch (err) {
            if (!err?.response) {
                alert('Server non attivo!');
            } else if (err.response?.status === 500) {
                setServerMsg(err.response?.data);
                setEditSuccess(true);
                setEditDone(false);
                setLoading(false);
                setConfirm(false);
            } else {
                alert('Modifica della recensione fallita!');
            }
        }

    }

    useEffect(() => {

        const getReview = async () => {

            setLoading(true);

            try {

                const response = await axios.post(REVIEW_INFO_URL,
                    {
                        id: params.reviewID
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${auth?.accessToken}`
                        },
                        withCredentials: true
                    }
                );

                setLoading(false);
                setReviewStars(response.data.stars);
                setReviewText(response.data.review_text);
                setReviewId(response.data.id)
                setReplyText(response.data.review_reply)

            } catch (err) {
                if (!err?.response)
                    alert('Server non attivo!');
                else if (err.response.status === 500) {
                    alert(err.response?.data);
                }
                else if (err.response.status === 404) {
                    alert(err.response?.data);
                } else {
                    alert('Recupero recensione fallito!');
                }

            }

        }

        getReview();

        // eslint-disable-next-line
    }, [])

    const handleReplyChange = (e) => {
        setIsModified(true);
        setReplyText(e);
    }

    const editConfirm = () => {
        setConfirm(true);
    }

    return (
        <section className="adminEditReview">

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

                        <div className="adminEditReview-heading">
                            <h2 className="adminEditReview-title">Recensione n. {reviewID}</h2>
                        </div>

                        <div className="card mb-4 shadow-sm">

                            <div className='adminEditReview-body'>
                                <div className='adminEditReview-text'>
                                    {
                                        confirm ?
                                            <div className='confirm-body'>                                                
                                                <span>Sei sicuro di voler modificare la recensione?</span>
                                                <div className="confirm-div">
                                                    <button className='btn' onClick={() => setConfirm(false)}>Annulla</button>
                                                    <button className='btn' onClick={() => editReply()}>Conferma</button>
                                                </div>                                              
                                            </div>
                                            : !editSuccess ?
                                                <>
                                                    <div>Testo recensione utente:</div>
                                                    <textarea
                                                        rows={10}
                                                        defaultValue={reviewText}
                                                        disabled />
                                                    <div>Valutazione (da 1 a 5): </div>
                                                    <div className='starBtn-div'>
                                                        <button className={reviewStars === 1 ? 'btnSel' : ''}>1</button>
                                                        <button className={reviewStars === 2 ? 'btnSel' : ''}>2</button>
                                                        <button className={reviewStars === 3 ? 'btnSel' : ''}>3</button>
                                                        <button className={reviewStars === 4 ? 'btnSel' : ''}>4</button>
                                                        <button className={reviewStars === 5 ? 'btnSel' : ''}>5</button>
                                                    </div>
                                                    <div>Testo risposta:</div>
                                                    <textarea
                                                        placeholder='Scrivi il testo della risposta...'
                                                        rows={10}
                                                        defaultValue={replyText}
                                                        onChange={(e) => handleReplyChange(e.target.value)}
                                                        />
                                                    
                                                    {
                                                        replyText.length > 0 && reviewStars !== 0 && isModified?
                                                            <div className='btn-div'>
                                                                <button className='btn' onClick={editConfirm}>Rispondi alla recensione</button>
                                                            </div>
                                                            :
                                                            <div className='btn-div'>
                                                                <button className='btn disabled'>Rispondi alla recensione</button>
                                                            </div>

                                                    }
                                                </> : editDone ?
                                                        <div className='success'>{serverMsg}!</div>
                                                    : <div className='notSuccess'>{serverMsg}!</div>
                                    }


                                </div>
                            </div>

                        </div>

                    </>
            }

        </section>
    )
}

export default AdminEditReview