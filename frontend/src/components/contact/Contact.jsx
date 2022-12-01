import './style.css'
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';

const Contact = () => {

  const recaptchaKey = '6Lf9XxUjAAAAACzG1N449v0G7xXiGacOD5F8GB9j';
  const recaptchaRef = React.createRef();

  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  }

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  return (

    <section className='contact'>
      <div className="content">
        <h2>Contattaci!</h2>
        <p>Se non hai trovato le riposte alle tue domande nella sezione <a href='/faqs'>FAQ's</a>, compila il form!</p>
      </div>
      <div className="container" id='contact-container'>
        <div className="contactInfo">
          <a href='https://goo.gl/maps/tEgdX6i3meDHF3Jm7' target='_blank' rel='noreferrer'>
            <div className="box">
              <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="text">
                <h3>Indirizzo</h3>
                <p>Viale Roma 104,<br/>Nereto (TE)<br/>64015</p>
              </div>
            </div>
          </a>
          <a href="tel:3387576322">
            <div className="box">
              <div className="icon"><i className="fas fa-phone-alt"></i></div>
                <div className="text">
                  <h3>Telefono</h3>
                  <p>338 7576322</p>
                </div>
            </div>
          </a>
          <a href="mailto:info@mrtecno.it">
            <div className="box">
              <div className="icon"><i className="fas fa-envelope"></i></div>
              <div className="text">
                <h3>E-mail</h3>
                <p>info@mrtecno.it</p>
              </div>
            </div>
          </a>
        </div>
        <div className="contactForm">
          <form onSubmit={onSubmit}>
            <h2>Manda il messaggio</h2>
            <div className="inputBox">
              <input type="text" name='' required='required'/>
              <span>Cognome e Nome</span>
            </div>
            <div className="inputBox">
              <input type="text" name='' required='required'/>
              <span>E-mail</span>
            </div>
            <div className="inputBox">
              <textarea type="text" name='' required='required'/>
              <span>Scrivi il messaggio...</span>
            </div>
            <div className="recaptchaContainer">
              <ReCAPTCHA 
                ref={recaptchaRef}
                sitekey={recaptchaKey}
                onChange={onChange}
              />
            </div>            
            <div className="inputBox">
              <input type="submit" name='' value="Invia"/>
            </div>           
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact