import React from 'react'
import "./style.css"

const Wrapper = () => {

    const data = [
        {
          cover: <i class='fas fa-truck'></i>,
          title: "Spedizione in tutto il mondo",
          decs: "Offriamo spedizioni in tutto il mondo con costi sostenuti",
        },
        {
          cover: <i class='fas fa-id-card'></i>,
          title: "Pagamento sicuro",
          decs: "Pagamento sicuro con PayPal",
        },
        {
          cover: <i class='fas fa-user-shield'></i>,
          title: "Shop With Confidence ",
          decs: "Prezzi competitivi",
        },
        {
          cover: <i class='fas fa-headset'></i>,
          title: "Supporto 24/7 ",
          decs: "Assitenza tecnica disponibile 24/7",
        },
      ]


  return (
    <>
        <section className="wrapper background">
            <div className="container grid2">
                {
                    data.map((value, index) => {
                        return(
                            <>
                                <div className="product" key={index}>
                                    <div className="img icon-circle">
                                        <i>{value.cover}</i>
                                    </div>
                                    <h3>{value.title}</h3>
                                    <p>{value.decs}</p>
                                </div>
                            </>
                        )
                    })}
            </div>
        </section>
    </>
  )
}

export default Wrapper