import React from 'react'
import './Style.css'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <section className='login'>
      <div className='container'>
        <div className="login-div">
            <h1>Login</h1>
            <form method='post'>
                <div className="txt_field">
                    <input type="text" name='username' required/>
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input type="password" name='password' required/>
                    <span></span>
                    <label>Password</label>
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