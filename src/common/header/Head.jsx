import React from 'react'
import { Link } from 'react-router-dom'

const Head = () => {

  return (
    <>
        <section className='head'>
            <div className="container d_flex">
                <div className="left row">
                    <i className="fa fa-phone"></i>
                    <a href="tel:338 7576322">338 7576322</a>
                    <i className="fa fa-envelope"></i>
                    <a href="mailto:info@mrtecno.it">info@mrtecno.it</a>
                </div>
                <div className="right row RText">
                    <Link to='/faq'>FAQ's</Link>
                    <Link to='/help'>Hai bisogno di aiuto?</Link>
                    <span>🇮🇹</span>
                    <label htmlFor=''>IT</label>
                    <span>🇬🇧</span>
                    <label htmlFor=''>EN</label>
                </div>
            </div>
        </section>  
    </>    
  )
}

export default Head