import React , {useRef, useState, useEffect} from 'react'
import './Style.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode';

const LOGIN_URL = '/api/user/auth';

const Login = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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

      const decoded = jwt_decode(accessToken);
      const role = decoded.UserInfo.role; 
        
      setAuth({user, role, accessToken});
      setUser('');
      setPwd(''); 

      if (role === 'admin'){
        const from = location.state?.from?.pathname || "/adminDashboard";
        navigate(from, { replace: true });
      }else{
        const from = location.state?.from?.pathname || "/userDashboard";
        navigate(from, { replace: true });
      }
      

    } catch (err) {
        if(!err?.response){
            setErrMsg('Server non attivo!');
        }else if(err.response?.status === 400){
          setErrMsg(err.response?.data);
        }else if(err.response?.status === 401){
          setErrMsg(err.response?.data);
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