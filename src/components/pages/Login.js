import React, { useRef, useState, useEffect } from 'react';
import '../../App.css';
import './Login.css';
import axios from 'axios';
import { useUserType } from '../UserTypeContext';

const login_URL = 'http://localhost:5000/login';

const Login = () => {
  const { setUserType, setUserName } = useUserType();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = { username: user, password: pwd };
    const response = await axios.post(login_URL, data);

    if(response.data.errCode == false){
      console.log(response.data);
  
      const token = response.data.token;
      console.log(token);
  
      localStorage.setItem("token", token);
  
      console.log('User Type:', response.data.type);      
      setUserType(response.data.type);
      console.log(user);
      setUserName(user);
      console.log(response.status);
      
      setUser('');
      setPwd('');
      window.location.href = '/';
    }
    else{
       setUser('');
       setPwd('');
       setErrMsg('Неправилна парола!');
    }
  } catch (err) {
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else {
      setErrMsg('Registration Failed');
      localStorage.clear();
    }
    errRef.current.focus();
  }
};


  return (
    <section className='sign-in-sec'>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
        {errMsg}
      </p>
      <h1>Вход</h1>
      <form className='onSubmit-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Име и фамилия:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor='password'>Парола:</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Влез</button>
      </form>
      <p className='p'>
        Нямаш акаунт?<br />
      </p>
        <span className='line'>
          <a href='/userRegInfo'>Виж как да си направиш!</a>
        </span>
    </section>
  );
};

export default Login;
