import React from 'react'
import './faq.css'
import { useState } from 'react'

const Faq = () => {

  const [accordion, setActiveAccordion] = useState(-1);

  const toggleAccordion = (index) => {
    if(index === accordion){
      setActiveAccordion(-1);
      return
    }
    setActiveAccordion(index);
  }

  const dataCollection = [
    {
      question:"Domanda 1",
      answer: "Risposta 1",
    },
    {
      question:"Domanda 2",
      answer: "Risposta 2",
    },
    {
      question:"Domanda 3",
      answer: "Risposta 3",
    },
    {
      question:"Domanda 4",
      answer: "Risposta 4",
    },

    
  ]


  return (
    <section className='faq'>
        <div className="container">
          <h2 className='accordion-title'>Frequently Asked Questions</h2>
            <div className="accordion-faq">
            {
              dataCollection.map((item, index) => {
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