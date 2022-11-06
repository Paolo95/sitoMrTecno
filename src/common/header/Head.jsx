import React from 'react'

const Head = () => {

  return (
    <>
        <section className='head'>
            <div className="container d_flex">
                <div className="left row">
                    <i className="fa fa-phone"></i>
                    <label>338 7576322</label>
                    <i className="fa fa-envelope"></i>
                    <label>info@mrtecno.it</label>
                </div>
                <div className="right row RText">
                    <label>FAQ's</label>
                    <label>Hai bisogno di aiuto?</label>
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