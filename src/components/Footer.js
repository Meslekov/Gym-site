import React from 'react'
import logo2 from '../images/logo2.png'
import {Link} from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
       <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>За нас</h2>
            <Link to='/about-us'>За нас</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Контакти</h2>
            <Link to='/contacts'>Контакти</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Социални мрежи</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <img src={logo2} alt="Ne" className="logo" /> 
            </Link>
          </div>
          <small className='website-rights'>Gym © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer