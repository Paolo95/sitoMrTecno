import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
        <footer>
            <div>
                <div className="container grid2">
                    <div className="box">
                        <h1>Mr.Tecno</h1>
                    </div>
                    <div className="box">
                        <h2>Chi siamo</h2>
                        <ul>
                            <li><a href="/storia">Storia</a></li>
                        </ul>
                    </div>
                    <div className="box">
                        <h2>Assitenza clienti</h2>
                        <ul>
                            <li><a href="/faq">FAQ's</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="box">
                        <h2>Contattaci</h2>
                        <ul>
                            <li>Viale Roma 104 - Nereto(TE)</li>
                            <li className='mail'>Email: <a href="mailto:info@mrtecno.it">info@mrtecno.it</a></li>
                            <li className='telephone'>Telefono: <a href="tel:3387576322">338 7576322</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='piva'>P.IVA 01940620675</div>
            <div className='madeby'>Sito web creato da <a href="https://paolocompagnoni.netlify.app/" target="_blank" rel="noopener noreferrer">Paolo Compagnoni</a></div>       
            <div className='rights'>All rights reserved</div>
        </footer>
    </>
  )
}

export default Footer