import React from "react";
import { useState } from 'react'
import logo2 from '../../images/logo2.png'
import {Link} from 'react-router-dom'
import '../../App.css'
import './Contacts.css'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contacts(){

   const form = useRef();

 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_rlvzgeg', 'template_si8s23i', form.current, {
        publicKey: 'mfBR88p6tV6C6TUTQ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

   
    console.log('Form submitted:', { name, email, message });
    
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
  <section class='social-info'>
        <div class='social-info-wrap'>
          <div class='footer-info-logo'>
            <Link to='/' className='social-info-logo'>
            <img src={logo2} alt="Ne" className="info-logo" /> 
            </Link>
          </div>
          <div className="website-time-rights-box">
            <div className="p-box">
              <p>Работно време: 14:30 - 20:30ч.</p> <br />
              <p>Телефон за връзка: 0876595559</p> <br />
              <p>Ел. поща: fitness@gmail.com</p>
            </div>
            
            <small class='website-info-rights'>Gym © 2024</small>
          </div>
          <div class='social-info-icons'>
            <Link
              class='social-info-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-info-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
          </div>
        </div>
      </section>

      <div className="message-box">
      <h1>Свържете се с нас</h1>
      <p>
       Имате въпроси или нужда от повече информация? Можете да се свържете с нас, чрез полетата отдолу.
      </p>
      <form ref={form} className="contacts_onSubmit-form" onSubmit={handleFormSubmit}>
        <label>
          Име:
          <input
            type="text"
            name="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Ел. поща:
          <input
            type="email"
             name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Съобщение:
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit" value="Send" >Изпрати</button>
      </form>
    </div>

    </div>
  )
}