import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Style.css'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

const Register = () => {

    const REGISTER_URL = '/api/user/register';

    const userRef = useRef();
    const errRef = useRef();

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchEmail, setMatchEmail] = useState('');
    const [validEmailMatch, setValidEmailMatch] = useState(false);
    const [matchEmailFocus, setMatchEmailFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const LASTNAME_REGEX = new RegExp(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
        const result = LASTNAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        const NAME_REGEX = new RegExp(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    useEffect(() => {
        const EMAIL_REGEX = new RegExp(/^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\.)+[a-z]{2,5}$/);
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
        const match = email === matchEmail;
        setValidEmailMatch(match);
    }, [email, matchEmail])

    useEffect(() => {
        const USER_REGEX = new RegExp(/^[a-zA-Z0-9._-]{4,}$/);
        const result = USER_REGEX.test(user);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        const PWD_REGEX = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,24}$/);
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidPwdMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    },[user, pwd, matchPwd])

    const handleSubmit = async (e) => {

        e.preventDefault();

        const LASTNAME_REGEX = new RegExp(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
        const NAME_REGEX = new RegExp(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
        const EMAIL_REGEX = new RegExp(/^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\.)+[a-z]{2,5}$/);
        const USER_REGEX = new RegExp('^[a-zA-Z0-9._-]{4,24}$');
        const PWD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,24}$');

        const v1 = LASTNAME_REGEX.test(lastName);
        const v2 = NAME_REGEX.test(name);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = USER_REGEX.test(user);
        const v5 = PWD_REGEX.test(pwd);

        if (!v1 || !v2 || !v3 || !v4 || !v5){
            setErrMsg("Registrazione non valida");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                { 
                    lastName: lastName,
                    name: name,
                    email: email,
                    username: user, 
                    password: pwd 
                },
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 409){
                setErrMsg(err.response?.status);
                console.log(err.response.data)
            } else {
                setErrMsg('Registation failed')
            }
            errRef.current.focus();
        }
    }

  return (
        <section className='register'>
        <div className='container'>
            <div className="register-div">
                <>
                {
                success ? (
                    <section>
                        <h1>Registrato con successo!</h1>
                        <p className='success-p'>
                            La registrazione è avvenuta con successo! <br/>
                            Effettua il tuo primo ordine!
                            <span className='success-login-link'>
                                <Link to='/login'>
                                    <button className='success-login-btn'>Login</button>
                                </Link>
                            </span>
                            
                        </p>
                    </section>
                ) : (
                    <>
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                <h1>Registrati</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input type="text" 
                            id='lastName'
                            required
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setLastName(e.target.value)}
                            aria-invalid={validLastName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}/>
                        <span></span>
                        <label htmlFor='lastName'>Cognome
                            <span className={validLastName ? 'valid' : 'hide'}>
                                <i className='fas fa-check'></i>
                            </span>
                            <span className={validLastName || !lastName ? 'hide' : 'invalid'}>
                                <i className='fas fa-times'></i>
                            </span>
                        </label>
                    </div>
                    <p id='uidnote' className={lastNameFocus && lastName && !validLastName ? 'instructions' : 'offscreen'}>
                            <i className='fas fa-info-circle'></i>
                            Non sono ammessi numeri o caratteri speciali <br/>
                    </p>
                    <div className="txt_field">
                        <input type="text" 
                            id='name'
                            required
                            autoComplete='off'
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}/>
                        <span></span>
                        <label htmlFor='name'>Nome
                            <span className={validName ? 'valid' : 'hide'}>
                                <i className='fas fa-check'></i>
                            </span>
                            <span className={validName || !name ? 'hide' : 'invalid'}>
                                <i className='fas fa-times'></i>
                            </span>
                        </label>
                    </div>
                    <p id='uidnote' className={nameFocus && name && !validName ? 'instructions' : 'offscreen'}>
                            <i className='fas fa-info-circle'></i>
                            Non sono ammessi numeri o caratteri speciali <br/>
                    </p>
                    <div className="txt_field">
                        <input type="email"
                            required
                            id='email'
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby='pwdnote'
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}/>
                        <span></span>
                        <label htmlFor='email'>
                            E-mail
                            <span className={validEmail ? 'valid' : 'hide'}>
                                <i className='fas fa-check'></i>
                            </span>
                            <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                <i className="fas fa-times"></i>
                            </span>
                        </label>
                    </div>
                    <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                        <i className='fa fa-info-circle'></i>
                        Inserisci una e-mail valida <br/>    
                    </p>
                    <div className="txt_field">
                        <input type="email"
                            required
                            id='confirm_email'
                            onChange={(e) => setMatchEmail(e.target.value)}
                            aria-invalid={validEmailMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchEmailFocus(true)}
                            onBlur={() => setMatchEmailFocus(false)}/>
                        <span></span>
                        <label htmlFor='confirm_email'>
                            Conferma e-mail
                            <span className={validEmailMatch && matchEmail ? 'valid' : 'hide'}>
                                <i className="fas fa-check"></i>
                            </span>
                            <span className={validEmailMatch || !matchEmail ? 'hide' : 'invalid'}>
                                <i className="fas fa-times"></i>
                            </span>
                        </label>                                   
                    </div>
                    <p id='confirmnote' className={matchEmailFocus && !validEmailMatch ? 'instructions' : 'offscreen'}>
                        <i className="fas fa-info-circle"></i>
                        Le e-mail inserite devono coincidere
                    </p>
                    <div className="txt_field">
                        <input type="text" 
                            id='username'
                            required
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            aria-invalid={validUser ? 'false' : 'true'}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}/>
                        <span></span>
                        <label htmlFor='username'>Username
                            <span className={validUser ? 'valid' : 'hide'}>
                                <i className='fas fa-check'></i>
                            </span>
                            <span className={validUser || !user ? 'hide' : 'invalid'}>
                                <i className='fas fa-times'></i>
                            </span>
                        </label>
                    </div>
                    <p id='uidnote' className={userFocus && user && !validUser ? 'instructions' : 'offscreen'}>
                            <i className='fas fa-info-circle'></i>
                            Dai 4 a 24 caratteri. <br/>
                            Deve iniziare con una lettera. <br/>
                            Caratteri speciali consentiti.
                    </p> 
                    <div className="txt_field">
                        <input type="password"
                            required
                            id='password'
                            onChange={(e) => setPwd(e.target.value)}
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby='pwdnote'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}/>
                        <span></span>
                        <label htmlFor='password'>
                            Password
                            <span className={validPwd ? 'valid' : 'hide'}>
                                <i className='fas fa-check'></i>
                            </span>
                            <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                <i className="fas fa-times"></i>
                            </span>
                        </label>
                    </div>
                    <p id='pwdnote' className={pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'}>
                        <i className='fa fa-info-circle'></i>
                        Dai 8 a 24 caratteri. <br/>
                        Devono includere lettere maiuscole e minuscole, numeri e carattere speciale. <br/>
                        Caratteri speciali consentiti: !@#$&*
    
                    </p>
                    <div className="txt_field">
                        <input type="password"
                            required
                            id='confirm_pwd'
                            onChange={(e) => setMatchPwd(e.target.value)}
                            aria-invalid={validPwdMatch ? 'false' : 'true'}
                            aria-describedby='confirmnote'
                            onFocus={() => setMatchPwdFocus(true)}
                            onBlur={() => setMatchPwdFocus(false)}/>
                        <span></span>
                        <label htmlFor='confirm_pwd'>
                            Conferma password
                            <span className={validPwdMatch && matchPwd ? 'valid' : 'hide'}>
                                <i className="fas fa-check"></i>
                            </span>
                            <span className={validPwdMatch || !matchPwd ? 'hide' : 'invalid'}>
                                <i className="fas fa-times"></i>
                            </span>
                        </label>                                   
                    </div>
                    <p id='confirmnote' className={matchPwdFocus && !validPwdMatch ? 'instructions' : 'offscreen'}>
                        <i className="fas fa-info-circle"></i>
                        Le password inserite devono coincidere
                    </p> 
                    <button disabled={!validLastName || !validName || !validEmail || !validEmailMatch
                                            || !validUser || !validPwd || !validPwdMatch ? true : false}>Registrati</button>
                </form>
                <p className='already-login'>
                    Sei già registrato?
                    <span className='login-line'>
                        <Link to='/login'>
                            Login
                        </Link>
                    </span>
                </p>
                </>)}
                </>
            </div>
            
        </div>
        </section>
    
  )
}

export default Register