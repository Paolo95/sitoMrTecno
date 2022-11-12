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
                            <li>Il nostro punto vendita</li>
                            <li>Termini e condizioni</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h2>Assitenza clienti</h2>
                        <ul>
                            <li>Help Center</li>
                            <li>Come acquistare</li>
                            <li>Traccia il tuo ordine</li>
                            <li>Lavora con noi</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h2>Contattaci</h2>
                        <ul>
                            <li>Viale Roma 104 - Nereto(TE)</li>
                            <li>Email: info@mrtecno.it</li>
                            <li>Telefono: 338 7576322</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='piva'>P.IVA 01940620675</div>
            <div className='madeby'>Sito web creato da <a href="https://www.paolocompagnoni.it" target="_blank" rel="noopener noreferrer">Paolo Compagnoni</a></div>       
            <div className='rights'>All rights reserved</div>
        </footer>
    </>
  )
}

export default Footer