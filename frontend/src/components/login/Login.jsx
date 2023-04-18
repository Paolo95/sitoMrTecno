import React , {useRef, useState, useEffect} from 'react'
import './Style.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import jwt_decode from 'jwt-decode';
import ClipLoader from 'react-spinners/ClipLoader';

const LOGIN_URL = '/api/user/auth';

const Login = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

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

      setLoading(true);
     
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
      setLoading(false);

      if (role === 'admin'){
        const from = location.state?.from?.pathname || "/adminDashboard/home";
        navigate(from, { replace: true });
      }else{
        const from = location.state?.from?.pathname || "/userDashboard/home";
        navigate(from, { replace: true });
      }
      

    } catch (err) {
        if(!err?.response){
          setErrMsg('Server non attivo!');
          setLoading(false);
        }else if(err.response?.status === 400){
          setErrMsg(err.response?.data);
          setLoading(false);
        }else if(err.response?.status === 401){
          setErrMsg(err.response?.data);
          setLoading(false);
        }else if(err.response?.status === 403){
          setErrMsg(err.response?.data);
          setLoading(false);
        }else{
          setErrMsg('Login fallito!');
          setLoading(false);
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
                {
                  loading ? <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                              <ClipLoader
                              color={'#0f3460'}
                              loading={loading}
                              size={50}
                              />
                          </div>
                          :
                          <input type="submit" value='Login' />

                }
                
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