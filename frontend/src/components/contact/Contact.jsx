import './style.css'
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useState } from 'react';

const Contact = () => {

  const validPassword = new RegExp(/^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\.)+[a-z]{2,5}$/);
  const recaptchaKey = '6LeocEUkAAAAANwgFKtVeJye8LhXaYXjsoJEQcBt';
  const [isRECAPTCHA, setRECAPTCHA] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

        if(validPassword.test(email)){
    
            emailjs.sendForm('service_8gvx77g', 'template_j713d87', form.current, 'AnyobiWOF9X3MbiYr')
            .then(() => {
                setIsSent(true);
                setHasError(false);
            }, (error) => {
                alert('Messaggio non inviato, errore nel server: ' + error)
            });

            e.target.reset();
        }else{
            setHasError(true);
            setIsSent(false);
            e.target.reset();
        }
  }

  function onChange() {
    setRECAPTCHA(true);
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
          <form ref={form} onSubmit={sendEmail}>
            <h2>Manda il messaggio</h2>
            <div className="inputBox">
              <input type="text" 
                     name='name' 
                     required/>
              <span>Cognome e Nome</span>
            </div>
            <div className="inputBox">
              <input type="text" 
                     name='email'
                     onChange={(e) => setEmail(e.target.value)}
                     required/>
              <span>E-mail</span>
            </div>
            <div className="inputBox">
              <textarea type="text" 
                        name='message'
                        required/>
              <span>Scrivi il messaggio...</span>
            </div>
            <div className="recaptchaContainer">
              <ReCAPTCHA 
                sitekey={recaptchaKey}
                onChange={onChange}
              />
            </div>            
            <div className="inputBox submit-div">
              {
                  isRECAPTCHA ? <input type="submit" className='btnSubmit' value="Invia"/>
                              : <input disabled type="submit" className='btnSubmit disabled' value="Invia"/>
              }
              {
                    isSent ? <div className='messageSent show'>Messaggio inviato!</div>
                           : <div className='messageSent'>Messaggio inviato!</div>
                }

{
                    hasError ? <div className='errorMsg show'>Mail non valida, riprova!</div>
                           : <div className='messageSent'>Messaggio inviato!</div>
                }      
            </div>
             
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact