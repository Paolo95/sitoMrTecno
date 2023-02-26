import React, { useEffect, useState } from 'react'
import './faqPage.css'
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';

const FaqPage = () => {

    const [loading, setLoading] = useState(false);
    const [newFaq, setNewFaq] = useState(false);
    const [questionModifiedIndexList, setQuestionModifiedIndexList] = useState({});
    const [answerModifiedIndexList, setAnswerModifiedIndexList] = useState({});
    const [newQuestion, setNewQuestion] = useState('');
    const [question, setQuestion] = useState({});
    const [newAnswer, setNewAnswer] = useState('');
    const [answer, setAnswer] = useState({});
    const [orderFaq, setFaqList] = useState([]);
    const GET_FAQ_LIST = 'api/faq/getFaqs';
    const NEW_FAQ_URL = 'api/faq/newFaq';
    const UPD_FAQ_URL = 'api/faq/updateFaq';
    const DEL_FAQ_URL = 'api/faq/deleteFaq';
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

    const handleQuestion = (e, i) => {

        setQuestionModifiedIndexList(questionModifiedIndexList => ({
            ...questionModifiedIndexList,
            [i] : true
        }));

        setQuestion(question => ({
            ...question,
            [i] : e
        }));
    }

    const handleNewQuestion = (e) => {

        setNewQuestion(e);
    }

    const handleNewAnswer = (e) => {

        setNewAnswer(e);
    }


    const handleAnswer = (e, i) => {

        setAnswerModifiedIndexList(answerModifiedIndexList => ({
            ...answerModifiedIndexList,
            [i] : true
        }));

        setAnswer(answer => ({
            ...answer,
            [i] : e
        }));
    }

    const handleCreateFaq = async () => {

        if (window.confirm("Sei sicuro di inserire la nuova FAQ?")) {

            setLoading(true);

            try {
            
            const response = await axios.post(NEW_FAQ_URL, 
                { 
                    newAnswer: newAnswer,
                    newQuestion : newQuestion,
                    
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );
        
            setLoading(false);
            alert(response.data);
            window.location.reload(true);

            } catch (err) {
            if(!err?.response){
                console.error('Server non attivo!');
            }else if(err.response?.status === 500){
                console.error(err.response?.data);
            }else{
                console.error('Inserimento della faq fallito!');
            }
            }    
        }
    }

    const updateFaq = async (faqID, i) => {

        if (window.confirm("Sei sicuro di voler modificare la FAQ?")) {

        setLoading(true);

            try {
            
            const response = await axios.post(UPD_FAQ_URL, 
                { 
                    id: faqID,
                    answer: answer[i],
                    question: question[i],
                    
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );
        
            setLoading(false);
            alert(response.data);
            window.location.reload(true);

            } catch (err) {
            if(!err?.response){
                console.error('Server non attivo!');
            }else if(err.response?.status === 500){
                console.error(err.response?.data);
            }else{
                console.error('Modifica della faq fallita!');
            }
            }   
        }
    }

    const deleteFaq = async (faqID) => {

        if (window.confirm("Sei sicuro di voler eliminare la FAQ?")) {

            setLoading(true);

            try {
            
            const response = await axios.post(DEL_FAQ_URL, 
                { 
                    id: faqID,                    
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.accessToken}`
                    },
                    withCredentials: true
                }
                );
        
            setLoading(false);
            alert(response.data);
            window.location.reload(true);

            } catch (err) {
            if(!err?.response){
                console.error('Server non attivo!');
            }else if(err.response?.status === 500){
                console.error(err.response?.data);
            }else{
                console.error('Cancellazione della faq fallita!');
            }
            }   
        }
    }

    return (
        <section className="faqPage">

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
                                                    placeholder='Scrivi il testo della nuova domanda...'
                                                    onChange={(e) => handleNewQuestion(e.target.value)}
                                                    value={newQuestion}/>
                                                    
                                            </div>

                                        </div>

                                        <div className='faq-answer-body'>
                                            <div className='faq-answer'>
                                                <textarea
                                                    placeholder='Scrivi il testo della nuova risposta...'
                                                    onChange={(e) => handleNewAnswer(e.target.value)}
                                                    value={newAnswer}
                                                    />
                                            </div>
                                        </div>

                                    </div>

                                    <div className='faq-btns'>
                                        {
                                            (newQuestion !== '' && newAnswer !== '') ? <button onClick={(handleCreateFaq)} className='btn-plus'><i className="fas fa-plus"></i></button> : 
                                                                 <button disabled className='btn-plus disabled'><i className="fas fa-plus"></i></button> 
                                        }
                                        
                                        <button className='btn-del' onClick={() => {setNewFaq(false); setNewAnswer(''); setNewQuestion('')}}><i className="fas fa-trash-alt"></i></button>
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
                                                            defaultValue={item.question}
                                                            onChange={(e) => handleQuestion(e.target.value, index)}
                                                            value={question[index]}/>
                                                    </div>

                                                </div>

                                                <div className='faq-answer-body'>
                                                    <div className='faq-answer'>
                                                        <textarea
                                                            defaultValue={item.answer}
                                                            onChange={(e) => handleAnswer(e.target.value, index)}
                                                            value={answer[index]}/>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='faq-btns'>
                                                <button className={(questionModifiedIndexList[index] === true || answerModifiedIndexList[index] === true) ? 'btn-upd ' : 'btn-upd disabled'}
                                                        onClick={() => updateFaq(item.id, index)}><i className="fas fa-check"></i></button>
                                                <button className='btn-del'
                                                        onClick={() => deleteFaq(item.id)}><i className="fas fa-trash-alt"></i></button>
                                            </div>

                                        </div>

                                    </div>
                                )
                            })
                        }
                        </>
            }            

        </section>
    )
}

export default FaqPage