import React, { useEffect, useState } from 'react'
import './faqPage.css'
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';

const FaqPage = () => {

    const [loading, setLoading] = useState(false);
    const [newFaq, setNewFaq] = useState(false);
    const [orderFaq, setFaqList] = useState([]);
    const GET_FAQ_LIST = 'api/faq/getFaqs';
    const { auth } = useAuth();

    const getFaqList = async () => {

        setLoading(true);

        try {

            const response = await axios.post(GET_FAQ_LIST,
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
            setFaqList(response.data);

        } catch (err) {
            if (!err?.response) {
                console.error('Server non attivo!');
            } else if (err.response?.status === 500) {
                console.error(err.response?.data);
            } else {
                console.error('Recupero faq fallito!');
            }
        }

    }

    useEffect(() => {
        if (orderFaq.length === 0) getFaqList();
    })

    const handleNewFaq = () => {
        setNewFaq(true);
    }

 

    return (
        <section className="faqPage">

            <div className="faqPage-heading">
                <h2 className="faqPage-title">Faq</h2>
                <div className="createBtn-div">
                    {
                        newFaq ? <button className='newBtn disabled' disabled onClick={handleNewFaq}><i className="fas fa-plus"></i></button>
                               : <button className='newBtn' onClick={handleNewFaq}><i className="fas fa-plus"></i></button>
                    }
                    
                </div>
               
            </div>

            <div className={newFaq ? "card mb-4 shadow-sm" : "card mb-4 shadow-sm hidden"}>

                    <div className="card-body">

                        <div className='single-faq'>

                            <div className='faq-question-body'>

                                <div className='faq-question'>
                                    <textarea
                                        placeholder='Scrivi il testo della nuova domanda...'/>
                                </div>

                            </div>

                            <div className='faq-answer-body'>
                                <div className='faq-answer'>
                                    <textarea
                                        placeholder='Scrivi il testo della nuova risposta...'
                                        />
                                </div>
                            </div>

                        </div>

                        <div className='faq-btns'>
                            <button className='btn-plus'><i className="fas fa-plus"></i></button>
                            <button className='btn-del'><i className="fas fa-trash-alt"></i></button>
                        </div>

                    </div>

                        </div>

            {
                orderFaq.map((item, index) => {
                    return(
                        <div key={index} className="card mb-4 shadow-sm">

                            <div className="card-body">

                                <div className='single-faq'>

                                    <div className='faq-question-body'>

                                        <div className='faq-question'>
                                            <textarea
                                                defaultValue={item.question}/>
                                        </div>

                                    </div>

                                    <div className='faq-answer-body'>
                                        <div className='faq-answer'>
                                            <textarea
                                                defaultValue={item.answer}/>
                                        </div>
                                    </div>

                                </div>

                                <div className='faq-btns'>
                                    <button className='btn-upd'><i className="fas fa-check"></i></button>
                                    <button className='btn-del'><i className="fas fa-trash-alt"></i></button>
                                </div>

                            </div>

                        </div>
                    )
                })
            }
            

        </section>
    )
}

export default FaqPage