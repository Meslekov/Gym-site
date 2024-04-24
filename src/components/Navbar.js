import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo2 from '../images/logo2.png';
import profile from '../images/profile4.jpg';
import { useUserType } from './UserTypeContext';
import axios from 'axios';

const auth_URL = 'http://localhost:5000/auth';

const Navbar = () => {

  
  const { userType } = useUserType();
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));

const response = await axios.post(auth_URL, {}, {
  headers: {
    'access-token': `${token}`
  }
});

    console.log(response.data);
    console.log(response.data.isLoggedIn);
    let isLoggedIn = response.data.isLoggedIn;
    //setIsLoggedIn(response.data.isLoggedIn);
    console.log(isLoggedIn);

    console.log('Navbar User Type:', userType);
    
    if (userType == 1 && isLoggedIn == true) {
      window.location.href = '/profile';
} else if (userType == 2 && isLoggedIn == true) {
 window.location.href = '/managerProfile';
} else if (isLoggedIn == false) {
  console.log(window.location.href = '/login');
   window.location.href = '/login';
} else {
   window.location.href = '/';
}
   
  }  catch (err) {
  console.error('Error:', err);
  if (err.response) {
    console.error('Response Data:', err.response.data);
    console.error('Response Status:', err.response.status);
       window.location.href = '/login';

  } else {
    console.error('No Server Response');
  }

  if (err.response && err.response.status === 401) {
    console.log("Invalid token");
    localStorage.clear();
  } else {
    console.log('Registration Failed');
        localStorage.clear();

  }
  }
};

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo2} alt="Ne" className="logo" />
        </Link>
        <ul className="nav-menu">
          <li className='nav-item'>
            <Link to='/' className='nav-links'>Начало</Link>
          </li>
          <li className='nav-item'>
            <Link to='/contacts' className='nav-links'>Контакти</Link>
          </li>
          <li className='nav-item'>
            <Link to='/prices' className='nav-links'>Цени</Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-links'>Вход</Link>
          </li>
          <li className='nav-item'>
            <Link to='/about-us' className='nav-links'>За нас</Link>
          </li>
        </ul>
        <Link onClick={handleClick} className="navbar-profile">
          <img src={profile} alt="Ne" className="profile" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
