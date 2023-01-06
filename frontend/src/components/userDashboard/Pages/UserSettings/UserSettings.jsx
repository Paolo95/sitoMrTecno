import React from 'react'
import './userSettingsStyle.css'
import { useState } from 'react'
import axios from '../../../../api/axios';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../../hooks/useLogout';

const UserSettings = () => {

  const [isChgBtn, setIsChgBtn] = useState(false);
  const [isDelBtn, setIsDelBtn] = useState(false);
  const [pwd, setPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const CHANGE_PWD_URL = '/api/user/changePassword';
  const DELETE_ACCOUNT_URL = '/api/user/deleteAccount';
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const showChgPwdFields = () => {
    setIsChgBtn(true);
  }

  const showDelAccFields = () => {
    setIsDelBtn(true);
  }

  const chgPwdHandleSubmit = async (e) => {
    e.preventDefault();

    const PWD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,24}$');
    
    const v1 = PWD_REGEX.test(newPwd);
    const v2 = PWD_REGEX.test(oldPwd);
    
    if (!v1 || !v2){
        alert("Password dagli 8 a 24 caratteri. Deve includere lettere maiuscole e minuscole, numeri e carattere speciale. Caratteri speciali consentiti: !@#$&*");
        setNewPwd('');
        setOldPwd('');
        return;
    }

    if (newPwd === oldPwd){
      alert("La password deve essere diversa dalla precedente!");
      setNewPwd('');
      setOldPwd('');
      return;
    }

    try {
     
      const response = await axios.post(CHANGE_PWD_URL, 
        { 
          oldPwd: oldPwd,
          newPwd: newPwd,
      },
      {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        },
        withCredentials: true
      }
      );
      
      setNewPwd('');
      setOldPwd('');   
      setIsChgBtn(false);

      alert(response.data)

    } catch (err) {
        if(!err?.response){
          alert('Server non attivo!');
        }else if(err.response?.status === 404){
          alert(err.response?.data);
        }else if(err.response?.status === 403){
          alert(err.response?.data);
        }else{
          alert('Modifica password fallita!');
        }
    }    
  }

  const delAccHandleSubmit = async (e) => {
    e.preventDefault();

    const PWD_REGEX = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,24}$');
    
    const v1 = PWD_REGEX.test(pwd);
    
    if (!v1){
        alert("Password dagli 8 a 24 caratteri. Deve includere lettere maiuscole e minuscole, numeri e carattere speciale. Caratteri speciali consentiti: !@#$&*");
        setPwd('');
        return;
    }

    try {
     
      const response = await axios.post(DELETE_ACCOUNT_URL, 
        { 
          password: pwd,
      },
      {
        headers: {
          'Authorization': `Bearer ${auth?.accessToken}`
        },
        withCredentials: true
      }
      );
      
      setPwd('');
      setIsDelBtn(false);

      alert(response.data);

      
      await logout();
      navigate('/');
      

    } catch (err) {
        if(!err?.response){
          alert('Server non attivo!');
        }else if(err.response?.status === 403){
          alert(err.response?.data);
        }else if(err.response?.status === 404){
          alert(err.response?.data);
        }else{
          alert('Eliminazione account fallita!');
        }
    }    
  }

  return (
    <section className='userSettings'>
      <div className='userSettings-div'>
          <div className="userSettings-container">
            <h1 className="heading">Impostazioni utente</h1>
          </div>
          <div className="userSettings-chgPwd">
            <div className="userSettings-chgPwdBtns">
              {
                isChgBtn ? 
                  <>
                      <form onSubmit={chgPwdHandleSubmit}>
                        <div className="txt_field">
                          <label htmlFor='oldPassword'>Vecchia Password</label>
                            <input type="password" 
                                  id='oldPassword'
                                  onChange={(e) => setOldPwd(e.target.value)}
                                  value={oldPwd}
                                  required/>
                            <span></span>
                            
                        </div>
                        <div className="txt_field">
                          <label htmlFor='newPassword'>Nuova password</label>
                            <input type="password" 
                                  id='newPassword'
                                  onChange={(e) => setNewPwd(e.target.value)}
                                  value={newPwd}
                                  required/>
                            <span></span>
                            
                        </div>
                        <input type="submit" value='Modifica password'/>
                    </form>
                  </> :
                  <>
                    <button className='pwdRec-btn' onClick={showChgPwdFields}>Modifica password</button> 
                  </>               
              }
              </div>
              
          </div>
          <div className="userSettings-delAccount">
            <h2>Zona pericolosa</h2>
              <div className="userSettings-delBtns">
                {
                  isDelBtn ? 
                    <>
                        <form onSubmit={delAccHandleSubmit}>
                          
                          <div className="txt_field">
                            <label htmlFor='newPassword'>Password</label>
                              <input type="password" 
                                    id='password'
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required/>
                              <span></span>
                              
                          </div>
                          <input type="submit" value='Elimina account'/>
                      </form>
                    </> :
                    <>
                      <button className='pwdRec-btn' onClick={showDelAccFields}>Elimina account</button> 
                    </>               
                }
                </div>        
          </div>           
      </div>
    </section>
  )
}

export default UserSettings