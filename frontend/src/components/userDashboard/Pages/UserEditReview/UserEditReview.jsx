import React, { useEffect, useState } from 'react'
import './userEditReview.css'
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';

const UserEditReview = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [editDone, setEditDone] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [serverMsg, setServerMsg] = useState('');
    const [reviewStars, setReviewStars] = useState(0);
    const [reviewID, setReviewId] = useState();
    const EDIT_REVIEW_URL = 'api/review/editReviewUser';
    const REVIEW_INFO_URL = 'api/review/reviewUserInfo';
    const { auth } = useAuth();

    const editReview = async () => {

        setLoading(true);

        try {

            const response = await axios.post(EDIT_REVIEW_URL,
                {
                    reviewText: reviewText,
                    reviewStars: reviewStars,
                    id: params.reviewId
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
                        id: params.reviewId
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

    const handleReviewChange = (e) => {
        setIsModified(true);
        setReviewText(e);
    }

    const editConfirm = () => {
        setConfirm(true);
    }

    const handleBtnSel = (btnNum) => {
        setIsModified(true);
        setReviewStars(btnNum);
    }

    return (
        <section className="userEditReview">

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

                        <div className="userEditReview-heading">
                            <h2 className="userEditReview-title">Recensione n. {reviewID}</h2>
                        </div>

                        <div className="card mb-4 shadow-sm">

                            <div className='userEditReview-body'>
                                <div className='userEditReview-text'>
                                    {
                                        confirm ?
                                            <div className='confirm-body'>                                                
                                                <span>Sei sicuro di voler modificare la recensione?</span>
                                                <div className="confirm-div">
                                                    <button className='btn' onClick={() => setConfirm(false)}>Annulla</button>
                                                    <button className='btn' onClick={() => editReview()}>Conferma</button>
                                                </div>                                              
                                            </div>
                                            : !editSuccess ?
                                                <>
                                                    <div>Testo recensione:</div>
                                                    <textarea
                                                        placeholder='Scrivi il testo della recensione...'
                                                        rows={10}
                                                        onChange={(e) => handleReviewChange(e.target.value)}
                                                        defaultValue={reviewText} />
                                                    <div>Valutazione (da 1 a 5): </div>
                                                    <div className='starBtn-div'>
                                                        <button className={reviewStars === 1 ? 'btnSel' : ''} onClick={() => handleBtnSel(1)}>1</button>
                                                        <button className={reviewStars === 2 ? 'btnSel' : ''} onClick={() => handleBtnSel(2)}>2</button>
                                                        <button className={reviewStars === 3 ? 'btnSel' : ''} onClick={() => handleBtnSel(3)}>3</button>
                                                        <button className={reviewStars === 4 ? 'btnSel' : ''} onClick={() => handleBtnSel(4)}>4</button>
                                                        <button className={reviewStars === 5 ? 'btnSel' : ''} onClick={() => handleBtnSel(5)}>5</button>
                                                    </div>
                                                    {
                                                        reviewText.length > 0 && reviewStars !== 0 && isModified?
                                                            <div className='btn-div'>
                                                                <button className='btn' onClick={editConfirm}>Modifica recensione</button>
                                                            </div>
                                                            :
                                                            <div className='btn-div'>
                                                                <button className='btn disabled'>Modifica recensione</button>
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

export default UserEditReview