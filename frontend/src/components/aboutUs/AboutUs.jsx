import React from 'react'
import './aboutUs.css'

const AboutUs = () => {
  return (
    <section className='aboutUs'>
        <div className="container">
            <div className='aboutUs-heading'>
                <h1>Chi siamo</h1>
            </div>
            
            <div className='aboutUs-container'>
                <h2>La nostra storia</h2>
                <p>
                    
                    MrTecno nasce come azienda dedicata alla riparazione e vendita di smartphone in provincia di Teramo.
                    Negli anni, l'azienda è cresciuta dedicandosi alla vendita di prodotti informatici di ogni tipologia e marca.
                </p>
                <h2>Perché scegliere noi?</h2>
                <p>
                    Noi di MrTecno ci impegniamo a fornire un'esperienza di acquisto facile e senza problemi, 
                    con una vasta gamma di prodotti al miglior prezzo e qualità per soddisfare le esigenze dei nostri clienti. 
                    <br />
                    <br />

                    Siamo orgogliosi di essere un'azienda affidabile e competente, che offre ai propri clienti la massima
                    assistenza pre e post vendita. Il nostro team è giovane e immerso da sempre nel mondo della tecnologia e 
                    quindi sceglie accuratamente i prodotti da fornire ai nostri clienti.
                    Siamo specializzati nella realizzazione di PC desktop, scelta dei componenti e riparazione e vendita di 
                    smartphone e PC.
                
                </p>
            </div>
        </div>
    </section>
  )
}

export default AboutUs