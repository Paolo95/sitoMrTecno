import React, { useEffect } from 'react'
import './faq.css'
import { useState } from 'react'
import axios from '../../api/axios';
import ClipLoader from 'react-spinners/ClipLoader';

const Faq = () => {

  const [accordion, setActiveAccordion] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const GET_FAQ_LIST_URL = '/api/faq/getFaqs'; 

  const toggleAccordion = (index) => {
    if(index === accordion){
      setActiveAccordion(-1);
      return
    }
    setActiveAccordion(index);
  }

  const getFaqList = async () => {

    setLoading(true);

    try {
     
      const response = await axios.post(GET_FAQ_LIST_URL, 
        { 

        },
        {
            headers: {
              headers: { 'Content-Type': 'application/json'},
            }
        }
      );  

      setLoading(false);
      setFaqList(response.data);

    } catch (err) {
      if (!err?.response) 
        alert('Server non attivo!');
      else if (err.response.status === 500 ){
        alert(err.response?.data);
      }
      else if (err.response.status === 404 ){
        alert(err.response?.data);
      }else {
        alert('Recupero ordine fallito!');
      }

    }    
    
  }

  useEffect(() => {

    if(faqList.length === 0) getFaqList();

    // eslint-disable-next-line
  },[]);

  return (
    <section className='faq'>
        <div className="container">
          <h2 className='accordion-title'>Frequently Asked Questions</h2>
            <div className="accordion-faq">
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
                  faqList.map((item, index) => {
                    return (
                      <div key={index} onClick={() => toggleAccordion(index)}>
                        <div className="accordion-faq-heading">
                          <h3 className={accordion === index ? 'active' : ""}>{item.question}</h3>
                          <div>
                            {accordion === index ? (<><span className='verticle'>-</span></>) 
                                                : (<><span className='verticle'>+</span></>)}
                            
                        </div>
                        </div>
                        
                        <div>
                          <p className={accordion === index ? 'answer active' : 'inactive'}>{item.answer}</p>
                        </div>
                      </div>
                    )
                })
              }
            </div>
        </div>
    </section>
  )
}

export default Faq