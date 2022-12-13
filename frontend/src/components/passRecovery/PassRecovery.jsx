import React , {useRef, useState, useEffect} from 'react'
import './Style.css'
import axios from '../../api/axios'

const RECOVERY_URL = '/api/user/userRecovery';

const PassRecovery = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [recEmail, setRecEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [response, setResponse] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [recEmail])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(RECOVERY_URL, 
        { 
            recEmail: recEmail,          
        },
        {
            headers: { 'Content-Type': 'application/json'},            
        }
      );

      setResponse(response);
      setSuccess(true);
      setRecEmail('');    

    } catch (err) {
        if(!err?.response){
            setErrMsg('Server non attivo!');
        }else if(err.response?.status === 403){
          setErrMsg(err.response?.data);
        }
        else if(err.response?.status === 409){
          setErrMsg(err.response?.data);
        }else if(err.response?.status === 500){
          setErrMsg(err.response?.data);
        }else{
          setErrMsg('Login fallito!');
        }
        errRef.current.focus();
    }    
  }

  return (
    <section className='passRecovery'>
      <div className='container'>
        <div className="passRecovery-div">
          <>
            {
            success ? (
                <section>
                    <h1>Conferma il cambio di password!</h1>
                    <p className='passRecovery-p'>
                        {response.data}<br/>                            
                    </p>
                </section>
            ) : (
            <>
          <div>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'}>{errMsg}</p>
          </div>                
            <h1>Recupera account</h1>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input type="text" 
                          id='recEmail'
                          ref={userRef}
                          autoComplete='off' 
                          onChange={(e) => setRecEmail(e.target.value)}
                          value={recEmail}
                          required/>
                    <span></span>
                    <label htmlFor='recEmail'>Email</label>
                </div>
                <input type="submit" value='Recupera account'/>
            </form>
            </>)}
            </>
        </div>
      </div>
    </section>
  )
}

export default PassRecovery