import React from 'react'
import "./style.css"

const Wrapper = () => {

    const data = [
        {
          cover: <i className='fas fa-truck'></i>,
          title: "Spedizione in tutta Italia",
          decs: "Spedizioni a 9,90€ con corriere GLS",
        },
        {
          cover: <i className='fas fa-id-card'></i>,
          title: "Pagamento sicuro",
          decs: "Ogni pagameto è gestito tramite PayPal",
        },
        {
          cover: <i className='fas fa-user-shield'></i>,
          title: "Acquista in sicurezza",
          decs: "Tutti i nostri prodotti sono testati con garanzia fornita da MrTecno",
        },
        {
          cover: <i className='fas fa-headset'></i>,
          title: "Supporto clienti",
          decs: "Assitenza tecnica disponibile dal lun al ven 09:00 - 20:00",
        },
      ]


  return (
    <>
        <section className="wrapper background">
            <div className="container grid2">
                {
                    data.map((value, index) => {
                        return(
                          
                                <div className="product" key={index}>
                                    <div className="img icon-circle">
                                        <i>{value.cover}</i>
                                    </div>
                                    <h3>{value.title}</h3>
                                    <p>{value.decs}</p>
                                </div>
                            
                        )
                    })}
            </div>
        </section>
    </>
  )
}

export default Wrapper