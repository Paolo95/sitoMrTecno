import React , {useRef, useContext, useState, useEffect} from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'

const LOGIN_URL = '/api/user/auth';

const Login = () => {

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post(LOGIN_URL, 
        { 
          username: user, 
          password: pwd
      },
      {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
      }
      );
      
      const accessToken = response?.data?.accessToken;
      const role = response?.data.role;

      setAuth({user, pwd, role, accessToken});
      setUser('');
      setPwd(''); 

      window.location = "/dashboard";

    } catch (err) {
        if(!err?.response){
            setErrMsg('No server response');
        }else if(err.response?.status === 400){
          setErrMsg('Username o password mancanti!');
        }else if(err.response?.status === 401){
          setErrMsg('Username o password errati, riprova');
        }else{
          setErrMsg('Login fallito!');
        }
        errRef.current.focus();
    }    
  }

  return (
    <section className='login'>
      <div className='container'>
        <div className="login-div">
          <div>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'}>{errMsg}</p>
          </div>                
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input type="text" 
                          id='username'
                          ref={userRef}
                          autoComplete='off' 
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required/>
                    <span></span>
                    <label htmlFor='username'>Username</label>
                </div>
                <div className="txt_field">
                    <input type="password" 
                          id='password'
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required/>
                    <span></span>
                    <label htmlFor='password'>Password</label>
                </div>
                <div className="pass">
                  <Link to='/passRecovery'>
                    Password dimenticata?
                  </Link>
                </div>
                <input type="submit" value='Login'/>
                <div className="signup_link">
                  Non sei registrato?
                  <Link to='/register'>
                    <span>Registrati!</span>
                  </Link>
                </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Login